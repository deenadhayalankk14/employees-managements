const { sequelize } = require('../config/db');
const Employee = require('../models/Employee');

const sampleEmployees = [
  {
    name: "Arlene",
    employeeId: "671190545",
    department: "Design",
    designation: "Design Lead",
    project: "Car Rental System",
    type: "Office",
    status: "Active"
  },
  {
    name: "Robert Wilson",
    employeeId: "671190546",
    department: "Sales",
    designation: "Sales Executive",
    project: "Client Acquisition",
    type: "Office",
    status: "Active"
  },
  {
    name: "Sarah Johnson",
    employeeId: "671190547",
    department: "Development",
    designation: "Senior Developer",
    project: "E-commerce Platform",
    type: "Hybrid",
    status: "Active"
  },
  {
    name: "Mike Chen",
    employeeId: "671190548",
    department: "Marketing",
    designation: "Marketing Specialist",
    project: "Marketing Campaign 2024",
    type: "Remote",
    status: "Active"
  },
  {
    name: "Emily Davis",
    employeeId: "671190549",
    department: "HR",
    designation: "HR Manager",
    project: "HR Management System",
    type: "Office",
    status: "Active"
  }
];

const setupDatabase = async () => {
  try {
    console.log('🔄 Starting database setup...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync all models (force: true will drop existing tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized');

    // Insert sample data
    for (const employeeData of sampleEmployees) {
      await Employee.create(employeeData);
    }
    console.log('✅ Sample data inserted');

    console.log('🎉 Database setup completed successfully!');
    console.log(`📊 Created ${sampleEmployees.length} sample employees`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
};

// Run if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase, sampleEmployees };