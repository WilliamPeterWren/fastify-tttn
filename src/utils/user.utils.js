const unidecode = require('unidecode');

function generatePassword () {
    const length = 10;
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password.toString();
};

const createSlug = (str) => {
    return unidecode(str)
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') 
    .replace(/\s+/g, '-') 
    .trim();
};

const generateSKU = async (productName, variant = {}) => {
    const prefix = productName.slice(0, 3).toUpperCase();

    const colorCode = variant.color ? variant.color.slice(0, 3).toUpperCase() : 'NOC'; 
    const storageCode = variant.storage ? variant.storage.replace(/[^0-9]/g, '') : 'NOS'; 

    const baseSKU = `${prefix}-${colorCode}-${storageCode}`;

    let sequence = 1;
    let sku = `${baseSKU}-${String(sequence).padStart(3, '0')}`; // e.g., "LAP-BLK-512-001"

    while (await Product.findOne({ 'variants.sku': sku })) {
        sequence++;
        sku = `${baseSKU}-${String(sequence).padStart(3, '0')}`;
    }

    return sku;
};




module.exports = { generatePassword, createSlug, generateSKU };