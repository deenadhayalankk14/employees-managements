import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import Header from './components/Header';
import { getEmployees } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error('Error loading employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeUpdate = () => {
    loadEmployees();
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <Routes>
          <Route 
            path="/" 
            element={
              <EmployeeList 
                employees={filteredEmployees}
                loading={loading}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onEmployeeUpdate={handleEmployeeUpdate}
              />
            } 
          />
          <Route 
            path="/add" 
            element={
              <AddEmployee onEmployeeUpdate={handleEmployeeUpdate} />
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <EditEmployee onEmployeeUpdate={handleEmployeeUpdate} />
            } 
          />
          <Route 
            path="/view/:id" 
            element={
              <ViewEmployee />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;