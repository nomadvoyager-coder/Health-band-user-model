// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginStaff = (staff_id, password) =>
  api.post('/auth/login', { staff_id, password });

// Staff data
export const fetchProfile = () => api.get('/staff/profile');
export const fetchVitals = () => api.get('/staff/vitals');
export const fetchRoomLogs = () => api.get('/staff/rooms');

export default api;
