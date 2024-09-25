const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;

exports.sendMessage = async (req, res) => {
  const { to, subject, body } = req.body; // Adjusted to match front-end

  if (!to || !subject || !body) {
    return res
      .status(400)
      .json({ error: "To, subject, and body are required." });
  }

  try {
    // Create reusable transporter object using Gmail
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL,
      to: to, // Use the 'to' field
      subject: subject, // Use the 'subject' field
      text: body, // Use the 'body' field
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};
