require('dotenv').config();
const fastify = require('fastify')({ logger: true, trustProxy: true });
fastify.register(require('@fastify/sensible'));
const mongoose = require('mongoose');
const fastifyJWT = require('@fastify/jwt');
const cors = require('@fastify/cors');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');
const fastifyOauth2 = require('@fastify/oauth2');

const Token = require('./src/models/Token');
const chatService = require('./src/chat/chat.service');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const JWT_SECRET = process.env.JWT_SECRET;
const ADDRESS_FASTIFY = process.env.ADDRESS_FASTIFY || "http://localhost:3000";

mongoose.set('strictQuery', false);
mongoose.set('autoIndex', true);

// TTL Index
async function ensureTTLIndex() {
  try {
    await Token.collection.dropIndex('created_at_1');
    await Token.collection.createIndex(
      { created_at: 1 },
      { name: 'created_at_1', expireAfterSeconds: 60 * 60 * 24 }
    );
    // console.log('TTL index recreated');
  } catch (err) {
    if (err.codeName === 'IndexNotFound') {
      console.log('Index not found, creating new one...');
      await Token.collection.createIndex(
        { created_at: 1 },
        { name: 'created_at_1', expireAfterSeconds: 60 * 60 * 24 }
      );
    } else {
      console.error('Error ensuring TTL index:', err);
    }
  }
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    fastify.log.info('MongoDB connected');
    await ensureTTLIndex();
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

fastify.decorateRequest('httpErrors', fastify.httpErrors);

// Middlewares
fastify.register(cors, {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false },
  saveUninitialized: false,
});

fastify.register(fastifyJWT, { secret: JWT_SECRET });

fastify.register(require("fastify-socket.io"), {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Auth decorator
fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error('Unauthorized server 00');
    const token = authHeader.split(' ')[1];
    request.user = await fastify.jwt.decode(token);
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized server 01' });
  }
});

// Google OAuth2
fastify.register(fastifyOauth2, {
  name: 'googleOAuth2',
  scope: ['profile', 'email'],
  credentials: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    auth: fastifyOauth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/login/google',
  callbackUri: process.env.GOOGLE_CALLBACK_URL,
});

// Socket.IO logic
fastify.ready().then(() => {
  fastify.io.on("connection", (socket) => {

    const userId = socket.handshake.auth?.userId;
    socket.userId = userId;

    socket.on("join", (roomId) => {
      fastify.log.info(`🧩 ${socket.userId} joined room: ${roomId}`);
      socket.join(roomId);
    });


    socket.on("typing", ({ to }) => {
      // fastify.log.info(`typing ${to}`);
      try {
        socket.to(to).emit("typing", { from: socket.userId }); 
      } catch (error) {
        fastify.log.error(`Failed to emit to ${to}`, error);
      }
    });

    socket.on("message", async ({ roomId, message }) => {
      fastify.log.info(` Message received for room ${roomId} by user ${socket.userId}`);
      try {
        const saved = await chatService.saveMessage(roomId, message);
        fastify.io.to(roomId).emit("message", saved);

        const [user1, user2] = roomId.split("_");
        const receiverId = socket.userId === user1 ? user2 : user1;

        fastify.log.info(`Sending new_message to receiverId: ${receiverId}`);

        socket.to(receiverId).emit("new_message", {
          from: socket.userId,
          content: saved.content,
          createdAt: saved.createdAt
        });

      } catch (err) {
        console.error("Failed to handle message:", err.message);
      }
    });


  });
});

fastify.addHook('onRequest', (req, _, done) => {
  req.server = fastify;
  done();
});

// Routes
fastify.get('/', async () => {
  return { message: 'E-commerce API is running' };
});

fastify.register(require('./src/admin/admin.routes'), { prefix: '/admin'});
fastify.register(require('./src/staff/staff.routes'), { prefix: '/staff' });

fastify.register(require('./src/auth/auth.routes'), { prefix: '/auth' });
fastify.register(require('./src/token/token.routes'),  { prefix: '/token'});

fastify.register(require('./src/google/google.routes'));
fastify.register(require('./src/user/user.routes'), { prefix: '/user' });
fastify.register(require('./src/address/address.routes'), { prefix: '/address'});

fastify.register(require('./src/chat/chat.routes'), { prefix: '/chat' });

fastify.register(require('./src/brand/brand.routes'), { prefix: '/brand' });
fastify.register(require('./src/discount/discount.routes'), { prefix: '/discount' });

fastify.register(require('./src/product/product.routes'), { prefix: '/product' });
fastify.register(require('./src/category/category.routes'), { prefix: '/category' });
fastify.register(require('./src/cart/cart.routes'), { prefix: '/cart' });
fastify.register(require('./src/order/order.routes'), { prefix: '/order' });

fastify.register(require('./src/review/review.routes'), { prefix: '/review' });

// Start server
const start = async () => {
  await connectDB();
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Server running on ${ADDRESS_FASTIFY}`);
  } catch (err) {
    fastify.log.error(`Server startup error: ${err.message}\n${err.stack}`);
    process.exit(1);
  }
};

start();
