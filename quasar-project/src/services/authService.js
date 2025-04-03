// src/services/authService.js
import axios from 'axios';

// Create a dedicated instance for auth requests
const api = axios.create({
  baseURL: 'https://quasar-status-app.onrender.com/api/auth',
});

export async function login(email, password) {
  console.log("🔁 Logging in with:", email);
  try {
    const response = await api.post('/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error("❌ Login error:", error.message);
    if (error.response) {
      console.error("🔴 Server responded:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("🛑 No response received. Axios request object:", error.request);
    } else {
      console.error("❗ Axios config/setup issue:", error.message);
    }
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
