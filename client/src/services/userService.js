import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api/users';

const getAuthHeader = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const userService = {
  // Get all users with optional role filtering
  getAllUsers: (role = null) => {
    const url = role ? `${API_URL}?role=${role}` : API_URL;
    return axios.get(url, getAuthHeader());
  },

  // Get user by ID
  getUserById: (userId) => {
    return axios.get(`${API_URL}/${userId}`, getAuthHeader());
  },

  // Update user role
  updateUserRole: (userId, role) => {
    return axios.patch(
      `${API_URL}/${userId}/role`,
      { role },
      getAuthHeader()
    );
  },

  // Delete user
  deleteUser: (userId) => {
    return axios.delete(`${API_URL}/${userId}`, getAuthHeader());
  },

  // Get user statistics
  getUserStats: () => {
    return axios.get(`${API_URL}/stats`, getAuthHeader());
  }
};

export default userService;
