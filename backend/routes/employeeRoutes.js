const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");

router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({
      message: "Error creating employee",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
      error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee =
      await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: "Error updating employee",
      error,
    });
  }
});

module.exports = router;