// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
