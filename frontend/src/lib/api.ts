import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API service functions
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile'),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  
  getAttendanceChartData: () => api.get('/dashboard/attendance-chart'),
  
  getPerformanceChartData: () => api.get('/dashboard/performance-chart'),
};

export const studentAPI = {
  getList: (params: Record<string, any>) => 
    api.get('/students', { params }),
  
  getById: (id: string) => api.get(`/students/${id}`),
  
  create: (data: Record<string, any>) => 
    api.post('/students', data),
  
  update: (id: string, data: Record<string, any>) => 
    api.put(`/students/${id}`, data),
  
  delete: (id: string) => api.delete(`/students/${id}`),
};

export const teacherAPI = {
  getList: (params: Record<string, any>) => 
    api.get('/teachers', { params }),
  
  getById: (id: string) => api.get(`/teachers/${id}`),
  
  create: (data: Record<string, any>) => 
    api.post('/teachers', data),
  
  update: (id: string, data: Record<string, any>) => 
    api.put(`/teachers/${id}`, data),
  
  delete: (id: string) => api.delete(`/teachers/${id}`),
};

export const classAPI = {
  getList: (params: Record<string, any>) => 
    api.get('/classes', { params }),
  
  getById: (id: string) => api.get(`/classes/${id}`),
  
  create: (data: Record<string, any>) => 
    api.post('/classes', data),
  
  update: (id: string, data: Record<string, any>) => 
    api.put(`/classes/${id}`, data),
  
  delete: (id: string) => api.delete(`/classes/${id}`),
};