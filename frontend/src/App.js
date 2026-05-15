import React, { useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employeeData) => {
  setEmployees([...employees, employeeData]);
};

const deleteEmployee = (employeeId) => {
  const updatedEmployees = employees.filter(
    (employee) => employee.employeeId !== employeeId
  );

  setEmployees(updatedEmployees);
};

  return (
    <div className="app-container">
      <h1 className="main-heading">
        Employee Management System
      </h1>

      <EmployeeForm addEmployee={addEmployee} />

      <EmployeeList
  employees={employees}
  deleteEmployee={deleteEmployee}
/>
    </div>
  );
}

export default App;