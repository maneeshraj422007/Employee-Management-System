const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const employeeRoutes = require("./routes/employeeRoutes");

const Employee = require("./models/Employee");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Database Connection Error");
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/employees", employeeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});