const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;

exports.sendMessage = async (req, res) => {
  try {
    const { email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reply to your message",
      text: message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending Message:", error);
  }
};
