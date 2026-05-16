import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [employees, setEmployees] = useState([]);

  const [editEmployee, setEditEmployee] = useState(null);

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees");
      console.log(error);
    }
  };

  // LOAD EMPLOYEES WHEN PAGE LOADS
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const addEmployee = async (employeeData) => {
    try {
      await axios.post(
        "http://localhost:5000/api/employees",
        employeeData
      );

      fetchEmployees();
    } catch (error) {
      console.log("Error adding employee");
      console.log(error);
    }
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${employeeId}`
      );

      fetchEmployees();
    } catch (error) {
      console.log("Error deleting employee");
      console.log(error);
    }
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async (updatedEmployeeData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/employees/${updatedEmployeeData._id}`,
        updatedEmployeeData
      );

      setEditEmployee(null);

      fetchEmployees();
    } catch (error) {
      console.log("Error updating employee");
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-heading">
        Employee Management System
      </h1>

      <EmployeeForm
        addEmployee={addEmployee}
        editEmployee={editEmployee}
        updateEmployee={updateEmployee}
      />

      <EmployeeList
        employees={employees}
        deleteEmployee={deleteEmployee}
        setEditEmployee={setEditEmployee}
      />
    </div>
  );
}

export default App;