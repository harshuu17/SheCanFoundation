import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor — attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('shecan_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('shecan_token');
      if (window.location.pathname.startsWith('/admin/dashboard')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Contact ─────────────────────────────────────────
export const submitContactForm = (data) => api.post('/contact', data);

// ─── Auth ─────────────────────────────────────────────
export const adminLogin        = (credentials) => api.post('/auth/login', credentials);
export const getAdminProfile   = ()            => api.get('/auth/profile');

// Member auth — mobile + password
export const memberCheck    = (data) => api.post('/auth/member/check',    data);
export const memberLogin    = (data) => api.post('/auth/member/login',    data);
export const memberRegister = (data) => api.post('/auth/member/register', data);

// ─── Submissions ──────────────────────────────────────
export const getSubmissions = (params) => api.get('/submissions', { params });
export const deleteSubmission = (id) => api.delete(`/submissions/${id}`);

// ─── Donations ────────────────────────────────────────
export const submitDonation = (data) => api.post('/donations', data);
export const getDonations = (params) => api.get('/donations', { params });

export default api;
