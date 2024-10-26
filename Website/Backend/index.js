require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");

// Connect to Database
const connectDB = require("./Config/db.js");
connectDB();

// Passport
const passport = require("passport");
require("./config/passport");

// Use environment variables
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser()); // Add this line to use cookie-parser
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the 'uploads' directory

// Require Routes
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes.js");
const coachRequestRoutes = require("./Routes/coachRequestRoutes.js");
const emailMessageRoutes = require("./Routes/emailMessageRoutes.js");
const coacheRoutes = require("./Routes/coachRoutes.js");
const serviceRoutes = require("./Routes/serviceRoutes.js");
const availabilityRoutes = require("./Routes/availabilityRoutes.js");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/coach-request", coachRequestRoutes);
app.use("/api/send-email", emailMessageRoutes);
app.use("/api/coaches", coacheRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/availability", availabilityRoutes);

// Main Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
