// This file handles all API calls to the backend server

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests after login
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Products
  getProducts() {
    return apiClient.get('/products');
  },
  
  getProductsByCategory(category) {
    return apiClient.get(`/products/category/${category}`);
  },
  
  getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },
  
  createProduct(product) {
    return apiClient.post('/products', product);
  },
  
  // Categories
  getCategories() {
    return apiClient.get('/categories');
  },


  // Users
  signup(userData) {
    return apiClient.post('/signup', userData);
  },

  login(loginData) {
    return apiClient.post('/login', loginData);
  },

  setAuthToken(token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  clearAuthToken() {
    delete apiClient.defaults.headers.common['Authorization'];
  }
  
};