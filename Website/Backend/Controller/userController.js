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

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).where({ isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
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
