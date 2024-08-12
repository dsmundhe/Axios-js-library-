const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL
const url = "mongodb://127.0.0.1:27017/users";

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    default: [],
  },
});

// Create a model from the schema
const userModel = mongoose.model("User", UserSchema); // Changed model name for clarity

// Connect to the MongoDB database
const dbConnection = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected.....");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

dbConnection();

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists with this email." });
    }

    // Create a new user
    const newUser = new userModel({
      name,
      password,
      email,
    });

    // Save the user in the database
    await newUser.save();
    res.status(201).json({ success: true, msg: "Registration successful." });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isMatch = await userModel.findOne({ email, password });
    if (!isMatch)
      return res.json({ msg: "invalid password and email...", success: false });
    res.json({ msg: "login successful......", success: true });
  } catch (error) {
    res.json({ mse: error.message, success: false });
  }
});
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
