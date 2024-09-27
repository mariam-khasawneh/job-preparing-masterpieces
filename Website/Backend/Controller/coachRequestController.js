const CoachRequest = require("../Models/coachRequestModel");
const coachRequestValidation = require("../Validators/coachRequestValidator"); // Ensure this line is present
const Coach = require("../Models/coachModel");
const User = require("../Models/userModel");

// Get all coach requests, or filter by status
exports.getAllRequests = async (req, res) => {
  try {
    const { status } = req.query; // Get status from query params (optional)

    let query = {};

    if (status) {
      // Ensure the status is valid
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status filter." });
      }
      query.status = status; // Apply the status filter
    }

    // Populate userId to include full_name, email, and other fields
    const coachRequests = await CoachRequest.find(query).populate({
      path: "userId",
      select: "full_name user_name email profilePicture role", // Select specific fields from the User model
    });

    res.status(200).json({ success: true, data: coachRequests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new coach request
exports.newRequest = async (req, res) => {
  try {
    const { userId, cv, introductoryVideo, experience, educationalBackground } =
      req.body;

    const newCoachRequest = new CoachRequest({
      userId,
      cv,
      introductoryVideo,
      experience,
      educationalBackground,
    });

    await newCoachRequest.save();

    // Populate the user data after saving the new coach request
    const populatedRequest = await CoachRequest.findById(
      newCoachRequest._id
    ).populate({
      path: "userId",
      select: "full_name user_name email profilePicture role",
    });

    res.status(201).json({ success: true, data: populatedRequest });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Review a coach request (approve/reject)
exports.reviewRequest = async (req, res) => {
  const { requestId } = req.params; // Get request ID from the URL params
  const { status, comments } = req.body; // Get status and comments from the request body

  // Ensure status is either "approved" or "rejected"
  if (!["approved", "rejected"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Invalid status. Must be 'approved' or 'rejected'." });
  }

  try {
    // Find the coach request by ID and update its status, comments, and review date
    const updatedRequest = await CoachRequest.findByIdAndUpdate(
      requestId,
      {
        status,
        comments,
        reviewDate: Date.now(), // Record the date of review
      },
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Coach request not found." });
    }

    // If status is "approved", create a new Coach entry and update the user's role to "coach"
    if (status === "approved") {
      const {
        userId,
        cv,
        experience,
        educationalBackground,
        introductoryVideo,
      } = updatedRequest;

      // Create new coach entry
      const newCoach = new Coach({
        userId,
        cv,
        experience,
        educationalBackground,
        introductoryVideo,
        approvedDate: Date.now(),
      });

      await newCoach.save(); // Save the coach entry

      // Update the user's role to "coach"
      await User.findByIdAndUpdate(userId, { role: "coach" });
    }

    // Respond with the updated request
    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error("Error updating coach request:", err);
    res.status(500).json({ error: "Failed to update coach request." });
  }
};
