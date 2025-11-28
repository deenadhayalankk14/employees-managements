import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getEmployee } from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await getEmployee(id);
      setEmployee(response.data.data);
    } catch (error) {
      console.error('Error loading employee:', error);
      setError('Failed to load employee data.');
    } finally {
      setLoading(false);
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

  if (error) {
    return (
      <div className="mt-4">
        <Alert variant="danger">
          {error}
        </Alert>
        <Button as={Link} to="/" variant="primary">
          Back to Employee List
        </Button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="mt-4">
        <Alert variant="warning">
          Employee not found.
        </Alert>
        <Button as={Link} to="/" variant="primary">
          Back to Employee List
        </Button>
      </div>
    );
  }

  return (
    <div className="view-employee mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">
          <i className="fas fa-user-circle me-2"></i>
          View Employee Details
        </h2>
        <Button as={Link} to="/" variant="outline-secondary">
          <i className="fas fa-arrow-left me-2"></i>
          Back to List
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h5 className="card-title mb-4 text-primary">
            <i className="fas fa-info-circle me-2"></i>
            Personal Information
          </h5>
          
          <Row className="mb-4">
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Name</label>
                <p className="fs-5">{employee.name}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Employee ID</label>
                <p className="fs-5">
                  <code>{employee.employeeId}</code>
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Department</label>
                <p className="fs-5">{employee.department}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Designation</label>
                <p className="fs-5">{employee.designation}</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Project</label>
                <p className="fs-5">
                  {employee.project || (
                    <span className="text-muted">Not assigned</span>
                  )}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Type</label>
                <p className="fs-5">{employee.type}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Status</label>
                <p className="fs-5">
                  <Badge bg={getStatusBadge(employee.status)} className="fs-6">
                    {employee.status}
                  </Badge>
                </p>
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button 
              as={Link} 
              to={`/edit/${employee.id}`}
              variant="primary"
            >
              <i className="fas fa-edit me-2"></i>
              Edit Employee
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewEmployee;