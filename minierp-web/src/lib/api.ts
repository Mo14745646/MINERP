import axios from 'axios';
import * as mockData from './mock-data';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isMock = process.env.NEXT_PUBLIC_MOCK_API === 'true';

// Mock API Interceptor
api.interceptors.request.use((config) => {
  if (isMock) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let data: any = null;
        
        if (config.url?.includes('/auth/login')) {
          data = { data: { token: mockData.MOCK_TOKEN, ...mockData.MOCK_USER } };
        } else if (config.url?.includes('/products')) {
          data = { data: { items: mockData.MOCK_PRODUCTS } };
        } else if (config.url?.includes('/orders')) {
          data = { data: { items: mockData.MOCK_ORDERS } };
        } else if (config.url?.includes('/inventory')) {
          data = { data: { items: mockData.MOCK_INVENTORY } };
        }

        if (data) {
          config.adapter = async () => ({
            data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          });
        }
        resolve(config);
      }, 500);
    });
  }
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add Interceptor for Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

