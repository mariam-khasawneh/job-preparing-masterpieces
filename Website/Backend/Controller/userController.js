const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
};

exports.getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ isDeleted: false });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user count", error });
  }
};

exports.getUser = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send({ error: "Invalid Username" }); // Use 400 Bad Request for invalid input
  }

  try {
    const user = await User.findOne({ user_name: username }); // Ensure correct field name

    if (!user) {
      return res.status(404).send({ error: "Couldn't Find the User" }); // Use 404 Not Found for user not found
    }

    // Remove password from user data
    const { password, ...rest } = user.toJSON(); // Convert to JSON and exclude password

    return res.status(200).send(rest); // Use 200 OK for successful retrieval
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).send({ error: "Server Error" }); // Use 500 Internal Server Error for server issues
  }
};

exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;

  if (!username) {
    return res.status(400).send({ error: "Invalid Username" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_name: username },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const { password, ...rest } = updatedUser.toJSON();

    return res.status(200).send({ message: "Record Updated ", user: rest });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server Error" });
  }
};

exports.getActive = async (req, res) => {
  try {
    const users = await User.find({ isActivated: true, isDeleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve active users", error });
  }
};

exports.getInActive = async (req, res) => {
  try {
    const users = await User.find({ isActivated: false, isDeleted: false });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve inactive users", error });
  }
};
