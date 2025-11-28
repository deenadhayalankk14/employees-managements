import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Employee API calls
export const employeeAPI = {
  // Get all employees
  getAll: () => api.get('/employees'),
  
  // Get employee by ID
  getById: (id) => api.get(`/employees/${id}`),
  
  // Create new employee
  create: (employeeData) => api.post('/employees', employeeData),
  
  // Update employee
  update: (id, employeeData) => api.put(`/employees/${id}`, employeeData),
  
  // Delete employee
  delete: (id) => api.delete(`/employees/${id}`),
  
  // Search employees
  search: (keyword) => api.get(`/employees/search/${keyword}`),
  
  // Get employee stats
  getStats: () => api.get('/employees/stats/summary'),
};

// Export individual functions for easier use
export const getEmployees = () => employeeAPI.getAll();
export const getEmployee = (id) => employeeAPI.getById(id);
export const createEmployee = (data) => employeeAPI.create(data);
export const updateEmployee = (id, data) => employeeAPI.update(id, data);
export const deleteEmployee = (id) => employeeAPI.delete(id);
export const searchEmployees = (keyword) => employeeAPI.search(keyword);
export const getEmployeeStats = () => employeeAPI.getStats();

export default api;