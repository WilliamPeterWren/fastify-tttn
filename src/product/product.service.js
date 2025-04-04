const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const Battery = require('../models/Battery');
const Camera = require('../models/Camera');
const Configuration = require('../models/Configuration');
const Connection = require('../models/Connection');
const Design = require('../models/Design');
const Memory = require('../models/Memory');
const Screen = require('../models/Screen');
const Utility = require('../models/Utility');

const {createSlug, generateSKU} = require('../utils/user.utils');

exports.create = async (body, fastify) => {
    const existingProduct = await Product.findOne({ product_name: body.product_name });
    if (existingProduct) {
        throw fastify.httpErrors.badRequest('Product with this name already exists');
    }

    const { product_name, details, product_images, brand, category, variants, battery, camera, configuration, connection, design, memory, screen, utility } = body;

    const product = new Product({
        product_name: product_name,
        product_images: product_images,
        details: details,
        slug: createSlug(product_name),
        brand: brand,
        category: category,
    });
    await product.save();

    const variantDocs = await Promise.all(
        variants.map(async (variant) => {
            const newVariant = new ProductVariant({
                color: variant.color,
                storage: variant.storage,
                price: variant.price,
                discount: variant.discount,
                stock: variant.stock,
                // sku: generateSKU(product_name, variant),
                sku: variant.sku,
                product: product._id
            });
            await newVariant.save();
            return newVariant._id; 
        })
    );

    const newBattery = new Battery(battery)
    await newBattery.save();

    const newCamera = new Camera(camera)
    await newCamera.save();
    
    const newConfiguration = new Configuration(configuration)
    await newConfiguration.save();
    
    const newConnection = new Connection(connection)
    await newConnection.save();
    
    const newDesign = new Design(design)
    await newDesign.save();
    
    const newMemory = new Memory(memory)
    await newMemory.save();
    
    const newScreen = new Screen(screen)
    await newScreen.save();
    
    const newUtility = new Utility(utility)
    await newUtility.save();

    product.variants = variantDocs;
    product.battery = newBattery;
    product.camera = newCamera;
    product.configuration = newConfiguration;
    product.connection = newConnection;
    product.design = newDesign;
    product.memory = newMemory;
    product.screen = newScreen;
    product.utility = newUtility;

    await product.save();
    
    return product;
};

exports.getAllProducts = async (page = 1, limit = 10) => {

  const variants = await ProductVariant.find({ stock: { $gt: 0 } }).select('product');
  const productIds = [...new Set(variants.map(v => v.product.toString()))]; 

  const products = await Product.find({ _id: { $in: productIds } })
    .populate('brand', 'brand_name')
    .populate('category', 'category_name')
    .populate('variants', 'color storage price')
    .select('-__v -created_at -reviews -battery -camera -configuration -connection -design -memory -screen -utility')
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return products ;
};

exports.getProductBySlug = async (slug, fastify) => {
  const product = await Product.findOne({slug})
    .populate('brand', 'brand_name')
    .populate('category', 'category_name')
    .populate('variants')
    .populate('battery')
    .populate('camera')
    .populate('configuration')
    .populate('connection')
    .populate('design')
    .populate('memory')
    .populate('screen')
    .populate('utility')        
    .select('-__v -created_at')    
    .lean();
  
  if (!product) {
    throw fastify.httpErrors.notFound('Product not found');
  }

  return product;
};

exports.updateProduct = async (slug, body) => {
  const product = await Product.findOne({ slug });
  if (!product) {
    throw new Error('Product not found');
  }

  const {
    product_name,
    details,
    product_images,
    brand,
    category,
    variants,
    battery,
    camera,
    configuration,
    connection,
    design,
    memory,
    screen,
    utility
  } = body;

  if (product_name) {
    product.product_name = product_name;
    product.slug = createSlug(product_name);
  }
  if (details) product.details = details;
  if (product_images) product.product_images = product_images;
  if (brand) product.brand = brand;
  if (category) product.category = category;

  if (battery) {
    const batteryId = product.battery || new mongoose.Types.ObjectId();
    const batteryDoc = await Battery.findOneAndUpdate(
      { _id: batteryId },
      battery,
      { upsert: true, new: true }
    );
    product.battery = batteryDoc._id;
  }

  if (camera) {
    const cameraDoc = await Camera.findOneAndUpdate(
      { _id: product.camera || new mongoose.Types.ObjectId() },
      camera,
      { upsert: true, new: true }
    );
    product.camera = cameraDoc._id;
  }

  if (variants && Array.isArray(variants)) {
    const updatedVariantIds = [];

    for (const variantData of variants) {
      let variantId;

      if (variantData._id) {
        const existingVariant = await ProductVariant.findById(variantData._id);
        if (existingVariant && existingVariant.product.equals(product._id)) {
          Object.assign(existingVariant, variantData);
          await existingVariant.save();
          variantId = existingVariant._id;
        } else {
          throw new Error(`Variant ${variantData._id} not found or doesn’t belong to this product`);
        }
      } else {
        const newVariant = new ProductVariant({
          ...variantData,
          product: product._id
        });
        await newVariant.save();
        variantId = newVariant._id;
      }

      updatedVariantIds.push(variantId);
    }

    product.variants = updatedVariantIds;
  }

  if (configuration) {
    const configurationId = product.configuration || new mongoose.Types.ObjectId();
    const configurationDoc = await Configuration.findOneAndUpdate(
      { _id: configurationId },
      configuration,
      { upsert: true, new: true }
    );
    product.configuration = configurationDoc._id;
  }

  if (connection) {
    const connectionId = product.connection || new mongoose.Types.ObjectId();
    const connectionDoc = await Connection.findOneAndUpdate(
      { _id: connectionId },
      connection,
      { upsert: true, new: true }
    );
    product.connection = connectionDoc._id;
  }

  if (design) {
    const designId = product.design || new mongoose.Types.ObjectId();
    const designDoc = await Design.findOneAndUpdate(
      { _id: designId },
      design,
      { upsert: true, new: true }
    );
    product.design = designDoc._id;
  }

  if (memory) {
    const memoryId = product.memory || new mongoose.Types.ObjectId();
    const memoryDoc = await Memory.findOneAndUpdate(
      { _id: memoryId },
      memory,
      { upsert: true, new: true }
    );
    product.memory = memoryDoc._id;
  }

  if (screen) {
    const screenId = product.screen || new mongoose.Types.ObjectId();
    const screenDoc = await Screen.findOneAndUpdate(
      { _id: screenId },
      screen,
      { upsert: true, new: true }
    );
    product.screen = screenDoc._id;
  }

  if (utility) {
    const utilityId = product.utility || new mongoose.Types.ObjectId();
    const utilityDoc = await Utility.findOneAndUpdate(
      { _id: utilityId },
      utility,
      { upsert: true, new: true }
    );
    product.utility = utilityDoc._id;
  }

  await product.save();

  const updatedProduct = await Product.findById(product._id)
    .populate('brand', 'brand_name')
    .populate('category', 'category_name')
    .populate('variants')
    .populate('battery')
    .populate('camera')
    .populate('configuration')
    .populate('connection')
    .populate('design')
    .populate('memory')
    .populate('screen')
    .populate('utility')
    .select('-__v -created_at')
    .lean();

  return updatedProduct;
};


exports.deleteProduct = async (slug) => {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug');
  }

  const deletedProduct = await Product.findOneAndDelete({ slug });
  if (!deletedProduct) {
    throw new Error('Product not found');
  }

  return deletedProduct;
};
