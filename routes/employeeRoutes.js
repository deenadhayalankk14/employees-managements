const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeStats
} = require('../controllers/employeeController');
const { validateEmployee, validateEmployeeId } = require('../middleware/validation');

// Public routes
router.route('/')
  .get(getEmployees)
  .post(validateEmployee, createEmployee);

router.route('/stats/summary')
  .get(getEmployeeStats);

router.route('/search/:keyword')
  .get(searchEmployees);

router.route('/:id')
  .get(validateEmployeeId, getEmployee)
  .put(validateEmployeeId, validateEmployee, updateEmployee)
  .delete(validateEmployeeId, deleteEmployee);

module.exports = router;