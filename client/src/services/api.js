import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sucre_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Halls API
export const getHalls = () => API.get('/halls');
export const getHallById = (id) => API.get(`/halls/${id}`);

// Packages API
export const getPackages = () => API.get('/packages');

// Addons API
export const getAddons = () => API.get('/addons');

// Booking API
export const calculateBooking = (payload) => API.post('/bookings/calculate', payload);
export const createBooking = (payload) => API.post('/bookings/create', payload);
export const getBookingByReference = (reference) => API.get(`/bookings/${reference}`);

// Paystack API
export const initializePayment = (payload) => API.post('/paystack/initialize', payload);
export const verifyPayment = (payload) => API.post('/paystack/verify', payload);

// Admin API
export const adminLogin = (credentials) => API.post('/admin/login', credentials);
export const getAdminAnalytics = () => API.get('/admin/analytics');
export const getAdminBookings = (params) => API.get('/admin/bookings', { params });
export const updateBookingStatus = (id, payload) => API.put(`/admin/bookings/${id}/status`, payload);

export default API;
