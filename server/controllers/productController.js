const Product = require('../models/Product');
const Category = require('../models/Category');

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, costPrice, sku } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check SKU uniqueness
    if (sku) {
      const skuExists = await Product.findOne({ sku });
      if (skuExists) {
        return res.status(409).json({ message: 'SKU already exists' });
      }
    }

    const product = await Product.create({
      name,
      description,
      category,
      price: Number(price),
      costPrice: Number(costPrice) || 0,
      sku: sku || undefined,
      image: req.file ? req.file.filename : undefined,
      stock: {
        available: 0,
        reserved: 0,
        damaged: 0
      },
      createdBy: req.user._id
    });

    await product.populate('category createdBy', 'name email');

    return res.status(201).json({
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating product',
      error: error.message
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const { category, active } = req.query;
    let query = {};

    if (category) query.category = category;
    if (active !== undefined) query.active = active === 'true';

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Products retrieved successfully',
      data: products,
      count: products.length
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error listing products',
      error: error.message
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('createdBy', 'name email role');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving product',
      error: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, costPrice, sku, active } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Verify authorization
    if (req.user.role !== 'admin' && !product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Verify category if updating
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
      product.category = category;
    }

    // Check SKU uniqueness
    if (sku && sku !== product.sku) {
      const skuExists = await Product.findOne({ sku, _id: { $ne: req.params.id } });
      if (skuExists) {
        return res.status(409).json({ message: 'SKU already exists' });
      }
      product.sku = sku;
    }

    if (name) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (costPrice !== undefined) product.costPrice = Number(costPrice);
    if (active !== undefined) product.active = active;
    if (req.file) product.image = req.file.filename;

    await product.save();
    await product.populate('category createdBy', 'name email');

    return res.status(200).json({
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating product',
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role !== 'admin' && !product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Stock Management

const updateStock = async (req, res) => {
  try {
    const { available, reserved, damaged } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (available !== undefined && available >= 0) {
      product.stock.available = available;
    }
    if (reserved !== undefined && reserved >= 0) {
      product.stock.reserved = reserved;
    }
    if (damaged !== undefined && damaged >= 0) {
      product.stock.damaged = damaged;
    }

    product.stock.lastRestockDate = new Date();
    await product.save();

    return res.status(200).json({
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating stock',
      error: error.message
    });
  }
};

const adjustStock = async (req, res) => {
  try {
    const { type, quantity } = req.body; // type: available, reserved, damaged

    if (!['available', 'reserved', 'damaged'].includes(type) || !quantity || quantity === 0) {
      return res.status(400).json({
        message: 'Invalid type or quantity. Type must be available, reserved, or damaged'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newValue = product.stock[type] + quantity;
    if (newValue < 0) {
      return res.status(400).json({
        message: `Cannot reduce ${type} stock below 0`
      });
    }

    product.stock[type] = newValue;
    product.stock.lastRestockDate = new Date();
    await product.save();

    return res.status(200).json({
      message: `Stock adjusted successfully`,
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adjusting stock',
      error: error.message
    });
  }
};

const getStockReport = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .select('name sku price costPrice stock active');

    const report = products.map(p => ({
      id: p._id,
      name: p.name,
      sku: p.sku,
      category: p.category?.name,
      price: p.price,
      costPrice: p.costPrice,
      stockAvailable: p.stock.available,
      stockReserved: p.stock.reserved,
      stockDamaged: p.stock.damaged,
      totalStock: p.stock.available + p.stock.reserved + p.stock.damaged,
      value: p.price * p.stock.available,
      costValue: p.costPrice * p.stock.available,
      active: p.active
    }));

    const totals = {
      totalValue: report.reduce((sum, p) => sum + p.value, 0),
      totalCostValue: report.reduce((sum, p) => sum + p.costValue, 0),
      totalItems: report.reduce((sum, p) => sum + p.totalStock, 0),
      productCount: report.length
    };

    return res.status(200).json({
      message: 'Stock report generated successfully',
      data: report,
      totals
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error generating stock report',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  adjustStock,
  getStockReport
};