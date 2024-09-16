const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;
const otpGenerator = require("otp-generator");

// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();

// const sendOTP = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL, // your email
//         pass: process.env.PASSWORD, // your email password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     // console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     throw new Error("Failed to send OTP. Please try again.");
//   }
// };

// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ message: "Email and OTP are required." });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP." });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired." });
//     }

//     // Clear OTP fields
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" } // Token expires in 1 day
//     );

//     // Set token as an HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//     });

//     res.cookie("user_id", user._id.toString(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//     });

//     await user.save();

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: "OTP verified successfully. You are now logged in.",
//       token, // Include token in response for frontend storage
//       user_id: user._id, // Include user_id in response for frontend storage
//     });
//   } catch (error) {
//     console.error("Error in verifyOTP controller:", error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };
