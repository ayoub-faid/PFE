import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api/categories';

const getAuthHeader = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const categoryService = {
  // Get all categories
  getAllCategories: (active = null) => {
    const url = active !== null ? `${API_URL}?active=${active}` : API_URL;
    return axios.get(url);
  },

  // Get category by ID
  getCategoryById: (categoryId) => {
    return axios.get(`${API_URL}/${categoryId}`);
  },

  // Create category
  createCategory: (formData) => {
    return axios.post(API_URL, formData, {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Update category
  updateCategory: (categoryId, formData) => {
    return axios.put(`${API_URL}/${categoryId}`, formData, {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Delete category
  deleteCategory: (categoryId) => {
    return axios.delete(`${API_URL}/${categoryId}`, getAuthHeader());
  }
};

export default categoryService;
