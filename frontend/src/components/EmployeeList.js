import React from "react";

function EmployeeList({ employees, deleteEmployee }) {
  const handleDelete = (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      deleteEmployee(employeeId);
    }
  };

  return (
    <div className="table-container">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No Employees Added</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(employee.employeeId)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;