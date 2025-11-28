const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start Express server
    const server = app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log('🚀 Employee Management System Backend');
      console.log('='.repeat(50));
      console.log(`✅ Server running in ${process.env.NODE_ENV} mode`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📊 Database: ${process.env.DB_NAME} (XAMPP MySQL)`);
      console.log('='.repeat(50));
      
      console.log('\n📋 Available Endpoints:');
      console.log(`GET    http://localhost:${PORT}/api/employees`);
      console.log(`POST   http://localhost:${PORT}/api/employees`);
      console.log(`GET    http://localhost:${PORT}/api/employees/:id`);
      console.log(`PUT    http://localhost:${PORT}/api/employees/:id`);
      console.log(`DELETE http://localhost:${PORT}/api/employees/:id`);
      console.log(`GET    http://localhost:${PORT}/api/employees/search/:keyword`);
      console.log(`GET    http://localhost:${PORT}/api/employees/stats/summary`);
      console.log('\n');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception thrown:', err);
  process.exit(1);
});

startServer();