const validateEmployee = (req, res, next) => {
  const { name, employeeId, department, designation } = req.body;

  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long');
  }

  if (!employeeId || employeeId.trim().length === 0) {
    errors.push('Employee ID is required');
  }

  if (!department || department.trim().length === 0) {
    errors.push('Department is required');
  }

  if (!designation || designation.trim().length === 0) {
    errors.push('Designation is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateEmployeeId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'Valid employee ID is required'
    });
  }

  next();
};

module.exports = {
  validateEmployee,
  validateEmployeeId
};