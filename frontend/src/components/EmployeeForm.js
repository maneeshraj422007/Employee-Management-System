import React, { useState } from "react";

function EmployeeForm({ addEmployee }) {
  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!employee.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!employee.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!employee.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!employee.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(employee.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!employee.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!employee.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!employee.salary.trim()) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(employee.salary)) {
      newErrors.salary = "Salary must be numeric";
    }

    if (!employee.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addEmployee(employee);

      alert("Employee Added Successfully");

      setEmployee({
        employeeId: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
      });

      setErrors({});
    }
  };

  return (
  <div className="form-container">
    <h2 className="form-title">Add Employee</h2>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.employeeId}</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.name}</p>
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.email}</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.phone}</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.department}</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.designation}</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.salary}</p>
      </div>

      <div className="form-group">
        <input
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={handleChange}
          className="form-input"
        />
        <p className="error-text">{errors.joiningDate}</p>
      </div>

      <button type="submit" className="submit-btn">
        Add Employee
      </button>
    </form>
  </div>
);
}

export default EmployeeForm;