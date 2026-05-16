import React, { useState } from "react";
import "./App.css";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [employees, setEmployees] = useState([]);

  const [editEmployee, setEditEmployee] = useState(null);

  const addEmployee = (employeeData) => {
    setEmployees([...employees, employeeData]);
  };

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.employeeId !== employeeId
    );

    setEmployees(updatedEmployees);
  };

  const updateEmployee = (updatedEmployeeData) => {
    const updatedEmployees = employees.map((employee) =>
      employee.employeeId === updatedEmployeeData.employeeId
        ? updatedEmployeeData
        : employee
    );

    setEmployees(updatedEmployees);

    setEditEmployee(null);
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