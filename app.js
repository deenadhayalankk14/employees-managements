const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/employees', employeeRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Employee Management API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    documentation: 'http://localhost:5000/api/employees'
  });
});

// API documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'API Documentation',
    endpoints: {
      'GET /api/employees': 'Get all employees',
      'POST /api/employees': 'Create new employee',
      'GET /api/employees/:id': 'Get employee by ID',
      'PUT /api/employees/:id': 'Update employee',
      'DELETE /api/employees/:id': 'Delete employee',
      'GET /api/employees/search/:keyword': 'Search employees',
      'GET /api/employees/stats/summary': 'Get employee statistics'
    }
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;