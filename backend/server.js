const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON requests

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Import routes (if any)
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
