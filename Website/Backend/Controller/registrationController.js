const { required } = require("joi");
const User = require("../Models/userModel");
const { registerSchema, loginSchema } = require("../Validators/userValidator");
const { createToken } = require("../Utils/tokenUtils");

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

    res.status(201).json({ message: "User registered successfully", token });
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

    const token = createToken(user);
    res.status(200).json({ message: "Login successful", token });
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

// reset password
