import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
  register: (name, email, password, role = 'client') => {
    return axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      role
    });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  saveUserData: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }
};

export default authService;
