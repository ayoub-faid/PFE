const express = require('express');
const multer = require('multer');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const { createProduct, listProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');

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

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, authorizeRoles('admin'), upload.single('image'), createProduct);
router.put('/:id', authMiddleware, authorizeRoles('admin'), upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProduct);

module.exports = router;
