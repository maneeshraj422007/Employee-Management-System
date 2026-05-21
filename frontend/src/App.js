import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [employees, setEmployees] = useState([]);

  const [editEmployee, setEditEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [sortOrder, setSortOrder] = useState("default");

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);

      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const addEmployee = async (employeeData) => {
    try {
      await axios.post(API_URL, employeeData);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${API_URL}/${employeeId}`);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async (updatedEmployeeData) => {
    try {
      await axios.put(
        `${API_URL}/${updatedEmployeeData._id}`,
        updatedEmployeeData
      );

      setEditEmployee(null);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };
   // SEARCH
   let filteredEmployees = employees.filter((employee) => {
    return (
      employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // FILTER
  if (departmentFilter !== "All") {
    filteredEmployees = filteredEmployees.filter(
      (employee) =>
        employee.department === departmentFilter
    );
  }

  // SORT
  if (sortOrder === "salary-low") {
    filteredEmployees.sort(
      (a, b) => a.salary - b.salary
    );
  }

  if (sortOrder === "salary-high") {
    filteredEmployees.sort(
      (a, b) => b.salary - a.salary
    );
  }
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

      {/* SEARCH FILTER SORT SECTION */}

      <div className="controls-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="search-input"
        />

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
          className="filter-select"
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          className="filter-select"
        >
          <option value="default">Sort By</option>
          <option value="salary-low">
            Salary Low to High
          </option>
          <option value="salary-high">
            Salary High to Low
          </option>
        </select>
      </div>

      <EmployeeList
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
        setEditEmployee={setEditEmployee}
      />
    </div>
  );
}
export default App;