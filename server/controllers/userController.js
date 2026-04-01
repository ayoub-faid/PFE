const User = require('../models/User');

// Get all users with optional role filtering
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    
    if (role && ['client', 'admin', 'delivery'].includes(role)) {
      query.role = role;
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
      count: users.length
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['client', 'admin', 'delivery'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be client, admin, or delivery' });
    }

    // Prevent admin from downgrading themselves
    if (req.user._id.toString() === id && role !== 'admin') {
      return res.status(400).json({ message: 'Cannot downgrade your own admin role' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get user statistics by role
const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const total = await User.countDocuments();

    return res.status(200).json({
      message: 'User statistics retrieved successfully',
      data: stats,
      total
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user statistics', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getUserStats
};
