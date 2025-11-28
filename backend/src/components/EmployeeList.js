import React, { useState } from 'react';
import { Table, Button, Card, Form, InputGroup, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/api';

const EmployeeList = ({ employees, loading, searchTerm, onSearchChange, onEmployeeUpdate }) => {
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete employee "${name}"?`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await deleteEmployee(id);
      showAlert('Employee deleted successfully!', 'success');
      onEmployeeUpdate();
    } catch (error) {
      console.error('Error deleting employee:', error);
      showAlert('Failed to delete employee. Please try again.', 'danger');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      Active: 'success',
      Inactive: 'secondary',
      Permanent: 'primary',
      Contract: 'warning',
      Temporary: 'info'
    };
    return variants[status] || 'secondary';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="employee-list mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">
          <i className="fas fa-users me-2"></i>
          Employee
        </h2>
        <Button as={Link} to="/add" variant="primary" size="lg">
          <i className="fas fa-plus-circle me-2"></i>
          Add New Employee
        </Button>
      </div>

      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <div className="row mb-3">
            <div className="col-md-6">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search employees by name, ID, department, or designation..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>

          {employees.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
              <p className="text-muted fs-5">No employees found</p>
              {searchTerm && (
                <p className="text-muted">Try adjusting your search terms</p>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Project</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="fw-semibold">{employee.name}</td>
                      <td>
                        <code>{employee.employeeId}</code>
                      </td>
                      <td>{employee.department}</td>
                      <td>{employee.designation}</td>
                      <td>
                        {employee.project || (
                          <span className="text-muted">Not assigned</span>
                        )}
                      </td>
                      <td>{employee.type}</td>
                      <td>
                        <Badge bg={getStatusBadge(employee.status)}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            as={Link}
                            to={`/view/${employee.id}`}
                            variant="outline-primary"
                            size="sm"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button
                            as={Link}
                            to={`/edit/${employee.id}`}
                            variant="outline-secondary"
                            size="sm"
                            title="Edit Employee"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            title="Delete Employee"
                            onClick={() => handleDelete(employee.id, employee.name)}
                            disabled={deleteLoading === employee.id}
                          >
                            {deleteLoading === employee.id ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <i className="fas fa-trash"></i>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeList;