import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <i className="fas fa-users me-2"></i>
          RS-TECH Employee Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active fw-bold' : ''}
            >
              <i className="fas fa-list me-1"></i>
              Employee List
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/add" 
              className={location.pathname === '/add' ? 'active fw-bold' : ''}
            >
              <i className="fas fa-plus-circle me-1"></i>
              Add Employee
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;