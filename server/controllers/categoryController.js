const Category = require('../models/Category');

const buildCategoryImageUrl = (req, image) => {
  if (!image || typeof image !== 'string') return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;

  const normalized = image.startsWith('/uploads/')
    ? image.replace(/^\/uploads\//, '')
    : image;

  return `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(normalized)}`;
};

const serializeCategory = (req, categoryDoc) => {
  const category = categoryDoc.toObject ? categoryDoc.toObject() : categoryDoc;
  return {
    ...category,
    imageUrl: buildCategoryImageUrl(req, category.image)
  };
};

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      description,
      image: req.file ? req.file.filename : undefined,
      createdBy: req.user._id
    });

    return res.status(201).json({
      message: 'Category created successfully',
      data: serializeCategory(req, category)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating category',
      error: error.message
    });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const { active } = req.query;
    let query = {};

    if (active !== undefined) {
      query.active = active === 'true';
    }

    const categories = await Category.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Categories retrieved successfully',
      data: categories.map((category) => serializeCategory(req, category)),
      count: categories.length
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving categories',
      error: error.message
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({
      message: 'Category retrieved successfully',
      data: serializeCategory(req, category)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving category',
      error: error.message
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { name, description, active } = req.body;

    // Check if name is unique (if updating name)
    if (name) {
      const existing = await Category.findOne({
        _id: { $ne: req.params.id },
        name: new RegExp(`^${name}$`, 'i')
      });
      if (existing) {
        return res.status(409).json({ message: 'Category name already exists' });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (active !== undefined) updateData.active = active;
    if (req.file) updateData.image = req.file.filename;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({
      message: 'Category updated successfully',
      data: serializeCategory(req, category)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating category',
      error: error.message
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({
      message: 'Category deleted successfully',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting category',
      error: error.message
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
