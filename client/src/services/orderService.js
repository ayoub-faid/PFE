import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const orderService = {
  createOrder: (orderData) => {
    return axios.post(API_URL, orderData, getAuthHeaders());
  },

  getOrders: (status) => {
    const params = status ? { status } : {};
    return axios.get(API_URL, { ...getAuthHeaders(), params });
  },

  getOrder: (id) => {
    return axios.get(`${API_URL}/${id}`, getAuthHeaders());
  },

  updateStatus: (id, status) => {
    return axios.patch(`${API_URL}/${id}/status`, { status }, getAuthHeaders());
  },

  generateInvoice: (id) => {
    return axios.post(`${API_URL}/${id}/invoice`, {}, getAuthHeaders());
  },

  downloadInvoice: (id) => {
    return axios.get(`${API_URL}/${id}/invoice/download`, {
      ...getAuthHeaders(),
      responseType: 'blob'
    });
  }
};

export default orderService;
