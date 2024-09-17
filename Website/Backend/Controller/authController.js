const { required } = require("joi");
const User = require("../Models/userModel");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { createToken } = require("../Utils/tokenUtils");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../Utils/emailUtils");

exports.registerUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { full_name, user_name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { user_name }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      full_name,
      user_name,
      email,
      password,
    });
    await user.save();

    // Create a token for the user
    const token = createToken(user);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "User registered successfully",
      username: user.user_name,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { user_name, email, password } = req.body;

    // Check if email or username is provided
    const query = email ? { email } : { user_name };
    const user = await User.findOne(query);

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // If login is successful:
    const token = createToken(user);

    // Set token in cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Lax",
    // });

    res
      .status(200)
      .json({ message: "Login successful", username: user.user_name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.params; // Get username from URL parameters

  if (!username) {
    return res
      .status(400)
      .json({ available: false, message: "Username is required" });
  }

  try {
    const user = await User.findOne({ user_name: username });

    if (user) {
      return res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    res.status(500).json({ available: false, message: "Server error" });
  }
};

exports.checkEmailAvailability = async (req, res) => {
  const { email } = req.params; // Get email from URL parameters

  if (!email) {
    return res
      .status(400)
      .json({ available: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    res.status(500).json({ available: false, message: "Server error" });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, send a positive response
    res.json({ isValid: true, userId: decoded.userId });
  } catch (error) {
    // If verification fails, send a negative response
    res.status(401).json({ isValid: false, message: "Invalid token" });
  }
};

exports.logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });

  // const googleLogoutUrl = `https://accounts.google.com/Logout`;
  // res.redirect(googleLogoutUrl);
};

exports.googleCallback = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "User information not available" });
    }

    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error in Google callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.initiatePasswordRecovery = async (req, res) => {
//   try {
//     const { user_name_or_email } = req.body;
//     console.log("Received user_name_or_email:", user_name_or_email); // Debug the input

//     // Find user by username or email
//     const user = await User.findOne({
//       $or: [{ email: email }, { user_name: user_name }],
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate OTP
//     const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
//     const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

//     // Save OTP to user
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Send email with OTP
//     await sendEmail(
//       user.email,
//       "Your OTP Code",
//       `Your OTP for password recovery is: ${otp}. This OTP will expire in 15 minutes.`
//     );

//     res.status(200).json({ message: "Recovery email sent successfully" });
//   } catch (error) {
//     console.error("Password recovery error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.initiatePasswordRecovery = async (req, res) => {
  try {
    // Destructure the request body to get user_name and email
    const { user_name, email } = req.body;

    // Debugging: log the request body to ensure it's correctly received
    console.log("Request body:", req.body);
    console.log("user_name:", user_name);
    console.log("email:", email);

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ email: email }, { user_name: user_name }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send email with OTP
    await sendEmail(
      user.email,
      "Your OTP Code",
      `Your OTP for password recovery is: ${otp}. This OTP will expire in 15 minutes.`
    );

    res
      .status(200)
      .json({ success: true, message: "Recovery email sent successfully" });
  } catch (error) {
    console.error("Password recovery error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { user_name_or_email, otp, new_password } = req.body;

    // Check if user_name_or_email is provided
    if (!user_name_or_email) {
      return res.status(400).json({ message: "Username or email is required" });
    }

    // Determine if user_name_or_email is an email or username
    const isEmail = user_name_or_email.includes("@");
    const query = isEmail
      ? { email: user_name_or_email }
      : { user_name: user_name_or_email };

    // Find user by either email or username
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update password
    user.password = new_password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// reset password
