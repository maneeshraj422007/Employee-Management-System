import React, { useEffect, useState } from "react";

function EmployeeForm({
  addEmployee,
  editEmployee,
  updateEmployee,
}) {
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

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    }
  }, [editEmployee]);

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
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!/^\d{10}$/.test(employee.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (isNaN(employee.salary)) {
      newErrors.salary = "Salary must be numeric";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editEmployee) {
        updateEmployee(employee);
      } else {
        addEmployee(employee);
      }

      clearForm();
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {editEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

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
          {editEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;