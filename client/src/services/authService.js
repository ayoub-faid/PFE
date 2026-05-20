import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const AUTH_INVALID_EVENT = 'auth:invalid-token';

let interceptorRegistered = false;

const decodeJwtPayload = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64Url.padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), '=');
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const clearSavedAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const notifyInvalidToken = () => {
  window.dispatchEvent(new Event(AUTH_INVALID_EVENT));
};

const authService = {
  register: (name, email, password, role = 'client', phone = '') => {
    return axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      role,
      phone
    });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
  },

  logout: () => {
    clearSavedAuth();
  },

  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken: () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') return null;
    return token;
  },

  isTokenExpired: (token) => {
    if (!token) return true;
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true;
    return Date.now() >= payload.exp * 1000;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  saveUserData: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },

  setupAuthInterceptor: () => {
    if (interceptorRegistered) return;
    interceptorRegistered = true;

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const message = String(error?.response?.data?.message || '').toLowerCase();
        const isAuthError =
          status === 401 &&
          (message.includes('invalid token') || message.includes('token missing') || message.includes('unauthorized'));

        if (isAuthError && authService.getToken()) {
          clearSavedAuth();
          notifyInvalidToken();
        }

        return Promise.reject(error);
      }
    );
  }
};

export { AUTH_INVALID_EVENT };
export default authService;
