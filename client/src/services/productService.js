import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api/products';

const getAuthHeader = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const productService = {
  // Get all products
  getAllProducts: (category = null, active = null) => {
    let url = API_URL;
    const params = [];
    if (category) params.push(`category=${category}`);
    if (active !== null) params.push(`active=${active}`);
    if (params.length > 0) url += '?' + params.join('&');
    return axios.get(url);
  },

  // Get product by ID
  getProductById: (productId) => {
    return axios.get(`${API_URL}/${productId}`);
  },

  // Create product
  createProduct: (formData) => {
    return axios.post(API_URL, formData, {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Update product
  updateProduct: (productId, formData) => {
    return axios.put(`${API_URL}/${productId}`, formData, {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Delete product
  deleteProduct: (productId) => {
    return axios.delete(`${API_URL}/${productId}`, getAuthHeader());
  },

  // Stock Management
  updateStock: (productId, stockData) => {
    return axios.patch(`${API_URL}/${productId}/stock`, stockData, getAuthHeader());
  },

  // Adjust stock (add or remove quantities)
  adjustStock: (productId, type, quantity) => {
    return axios.patch(
      `${API_URL}/${productId}/stock/adjust`,
      { type, quantity },
      getAuthHeader()
    );
  },

  // Get stock report
  getStockReport: () => {
    return axios.get(`${API_URL}/stock/report`, getAuthHeader());
  }
};

export default productService;
