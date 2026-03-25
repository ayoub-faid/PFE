const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity) || 0,
      image: req.file ? req.file.filename : undefined,
      createdBy: req.user._id
    });

    return res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    return res.status(500).json({ message: 'Create product error', error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email role');
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'List products error', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email role');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Get product error', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.user.role !== 'admin' && !product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.quantity = req.body.quantity !== undefined ? Number(req.body.quantity) : product.quantity;
    if (req.file) product.image = req.file.filename;

    await product.save();
    return res.json({ message: 'Product updated', product });
  } catch (error) {
    return res.status(500).json({ message: 'Update product error', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.user.role !== 'admin' && !product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await product.deleteOne();
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Delete product error', error: error.message });
  }
};

module.exports = { createProduct, listProducts, getProduct, updateProduct, deleteProduct };