const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const employeeRoute = require('./routes/employeeRoutes');
const authRoute = require('./routes/authRoute');
const app = express();
const fs = require('fs');

dotenv.config();

require('./config/mongoDb');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server running on port 8000"));

app.use("/api/v1/employee",employeeRoute)
app.use("/api/v1/auth",authRoute)
