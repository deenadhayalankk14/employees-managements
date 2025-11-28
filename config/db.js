const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'employee_management',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false
    }
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected successfully via XAMPP');
    
    // Sync all models
    await sequelize.sync({ 
      force: false, // Set to true only in development to reset DB
      alter: process.env.NODE_ENV === 'development' // Auto-update tables in dev
    });
    console.log('✅ Database synchronized');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.log('\n💡 XAMPP Troubleshooting:');
    console.log('1. Start XAMPP Control Panel');
    console.log('2. Start Apache and MySQL services');
    console.log('3. Open http://localhost/phpmyadmin');
    console.log('4. Create database: employee_management');
    console.log('5. Default credentials: user=root, password=(empty)');
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };