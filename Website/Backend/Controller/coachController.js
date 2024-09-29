const Coach = require("../Models/coachModel");
const User = require("../Models/userModel");

// Get all coaches
exports.getAllCoaches = async (req, res) => {
  try {
    // Retrieve all coaches that are not deleted
    const coaches = await Coach.find({ isDeleted: false })
      .populate("userId", "full_name user_name email role profilePicture")
      .exec();

    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving coaches", error });
  }
};

// Toggle coach activation
exports.toggleCoachActivation = async (req, res) => {
  const { coachId } = req.params;

  try {
    // Find the coach by ID
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Toggle coach activation status
    coach.isActivated = !coach.isActivated;
    await coach.save();

    // Find the user associated with the coach and update their role
    const user = await User.findById(coach.userId);
    if (user) {
      user.role = coach.isActivated ? "coach" : "user"; // Toggle role based on activation status
      await user.save();
    }

    const statusMessage = coach.isActivated
      ? "Coach activated and user role updated to 'coach'"
      : "Coach deactivated and user role updated to 'user'";

    res.status(200).json({ message: statusMessage });
  } catch (error) {
    res.status(500).json({ message: "Error toggling coach activation", error });
  }
};

// Get coach id by user id
exports.getCoachIdByUserId = async (userId) => {
  try {
    const coach = await Coach.findOne({ userId }).select("_id");
    if (!coach) {
      throw new Error("No coach found for the given user ID.");
    }
    return coach._id; // Return the coach ID
  } catch (error) {
    console.error("Error fetching coach ID:", error);
    throw error; // Propagate the error
  }
};

// Get coach profile
exports.getCoachProfile = async (req, res) => {
  try {
    // Access the user's ID from req.user
    const userId = req.user.id;

    // Find the coach profile by userId
    const coachProfile = await Coach.findOne({ userId: userId });

    // Check if the coach profile exists
    if (!coachProfile) {
      return res.status(404).json({ message: "Coach profile not found." });
    }

    // Return the coach profile
    return res.status(200).json(coachProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Update user profile
exports.updateCoachProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the coach profile by userId
    const coachProfile = await Coach.findOne({ userId: userId });

    // Check if the coach profile exists
    if (!coachProfile) {
      return res.status(404).json({ message: "Coach profile not found." });
    }

    // Update the coach profile fields with the request body
    // Use Object.assign to merge the updates while retaining existing fields
    Object.assign(coachProfile, req.body);

    // Save the updated profile
    await coachProfile.save();

    // Return the updated profile
    return res.status(200).json(coachProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Get Coach by user id
exports.getCoachByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the coach by userId
    const coach = await Coach.findOne({ userId })
      .populate("userId", "full_name user_name email role profilePicture")
      .exec();

    // Check if coach profile exists
    if (!coach) {
      return res.status(404).json({ message: "Coach not found." });
    }

    // Return the coach profile
    return res.status(200).json(coach);
  } catch (error) {
    console.error("Error fetching coach:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
