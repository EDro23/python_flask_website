// src/boot/axios.js
import axios from 'axios';
import { logout } from 'src/services/authService';


axios.defaults.baseURL = 'http://localhost:3001/api';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default ({ app, router, store }) => {
  // Optional: setup additional global configuration for axios here
};
