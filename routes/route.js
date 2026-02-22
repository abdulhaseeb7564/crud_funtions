const express = require("express");
const router = express.Router();

// Import controller functions
const { 
  createUser, 
  getUser, 
  getUserById, 
  updateUser, 
  deleteUser,
  loginUsers

} = require("../controller/userController");

// Create user
router.post("/add", createUser);

// Get all users
router.get("/getAllUsers", getUser);

// Get user by ID
router.get("/getUsersById/:id", getUserById);

// Update user
router.put("/update/:id", updateUser);

// Delete user
router.delete("/delete/:id", deleteUser);

// login users 
router.post("/loginUsers",loginUsers)

module.exports = {router};
