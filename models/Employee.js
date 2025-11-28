const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Employee name is required'
      },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    }
  },
  employeeId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      name: 'unique_employeeId',
      msg: 'Employee ID already exists'
    },
    validate: {
      notEmpty: {
        msg: 'Employee ID is required'
      }
    }
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Department is required'
      }
    }
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Designation is required'
      }
    }
  },
  project: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  type: {
    type: DataTypes.ENUM('Office', 'Remote', 'Hybrid'),
    defaultValue: 'Office',
    validate: {
      isIn: {
        args: [['Office', 'Remote', 'Hybrid']],
        msg: 'Type must be Office, Remote, or Hybrid'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
    validate: {
      isIn: {
        args: [['Active', 'Inactive']],
        msg: 'Status must be Active or Inactive'
      }
    }
  }
}, {
  tableName: 'employees',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['employeeId']
    },
    {
      fields: ['department']
    },
    {
      fields: ['status']
    },
    {
      fields: ['createdAt']
    }
  ]
});

// Instance methods
Employee.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
};

module.exports = Employee;