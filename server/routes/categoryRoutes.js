const express = require('express');
const multer = require('multer');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DIR || 'uploads');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage });

const router = express.Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin only routes
router.post('/', authMiddleware, authorizeRoles('admin'), upload.single('image'), createCategory);
router.put('/:id', authMiddleware, authorizeRoles('admin'), upload.single('image'), updateCategory);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteCategory);

module.exports = router;
