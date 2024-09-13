require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

// Connect to Database
const connectDB = require("./Config/db.js");
connectDB();

// Require Routes
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes.js");

// Use environment variables
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser()); // Add this line to use cookie-parser

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Main Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
