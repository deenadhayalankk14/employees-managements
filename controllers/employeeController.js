const { Op } = require('sequelize');
const Employee = require('../models/Employee');

// @desc    Get all employees with filtering and pagination
// @route   GET /api/employees
const getEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, department, status } = req.query;
    
    // Build where condition
    const whereCondition = {};
    
    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { employeeId: { [Op.like]: `%${search}%` } },
        { designation: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (department) {
      whereCondition.department = department;
    }
    
    if (status) {
      whereCondition.status = status;
    }

    const offset = (page - 1) * limit;
    
    const { count, rows: employees } = await Employee.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
const createEmployee = async (req, res, next) => {
  try {
    const { name, employeeId, department, designation, project, type, status } = req.body;

    // Check if employeeId already exists
    const existingEmployee = await Employee.findOne({ where: { employeeId } });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID already exists'
      });
    }

    const employee = await Employee.create({
      name,
      employeeId,
      department,
      designation,
      project,
      type,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
const updateEmployee = async (req, res, next) => {
  try {
    const { name, department, designation, project, type, status } = req.body;

    let employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // If employeeId is being updated, check for duplicates
    if (req.body.employeeId && req.body.employeeId !== employee.employeeId) {
      const existingEmployee = await Employee.findOne({ 
        where: { employeeId: req.body.employeeId } 
      });
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID already exists'
        });
      }
    }

    employee = await employee.update(req.body);

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await employee.destroy();
    
    res.json({
      success: true,
      message: 'Employee deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees
// @route   GET /api/employees/search/:keyword
const searchEmployees = async (req, res, next) => {
  try {
    const { keyword } = req.params;
    
    const employees = await Employee.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { employeeId: { [Op.like]: `%${keyword}%` } },
          { department: { [Op.like]: `%${keyword}%` } },
          { designation: { [Op.like]: `%${keyword}%` } },
          { project: { [Op.like]: `%${keyword}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee statistics
// @route   GET /api/employees/stats/summary
const getEmployeeStats = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.count();
    const activeEmployees = await Employee.count({ where: { status: 'Active' } });
    const departments = await Employee.findAll({
      attributes: [
        'department',
        [Employee.sequelize.fn('COUNT', Employee.sequelize.col('id')), 'count']
      ],
      group: ['department'],
      raw: true
    });

    res.json({
      success: true,
      data: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: totalEmployees - activeEmployees,
        byDepartment: departments
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeStats
};