const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// All user routes require authentication and admin role
router.use(authMiddleware);
router.use(authorizeRoles('admin'));

// Get user statistics
router.get('/stats', getUserStats);

// Get all users with optional role filtering
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user role
router.patch('/:id/role', updateUserRole);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
