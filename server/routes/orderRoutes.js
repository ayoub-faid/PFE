const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  generateInvoice,
  downloadInvoice
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrder);
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateOrderStatus);
router.post('/:id/invoice', authMiddleware, authorizeRoles('admin'), generateInvoice);
router.get('/:id/invoice/download', authMiddleware, downloadInvoice);

module.exports = router;
