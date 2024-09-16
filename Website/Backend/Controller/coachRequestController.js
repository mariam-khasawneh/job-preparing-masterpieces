const CoachRequest = require("../Models/coachRequestModel");
const coachRequestvalidation = require("../Validators/coachRequestValidator");
const Coach = require("../Models/coachModel");

// Create a new coach request
exports.newRequest = async (req, res) => {
  const { error } = coachRequestvalidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { userId, experience, educationalBackground } = req.body;

    // Get the file paths of the uploaded CV and video
    const cv = req.files["cv"] ? req.files["cv"][0].path : null;
    const video = req.files["video"] ? req.files["video"][0].path : null;

    if (!cv || !video) {
      return res
        .status(400)
        .json({ error: "Both CV and video files are required." });
    }

    const coachRequest = new CoachRequest({
      userId,
      cv,
      video,
      experience,
      educationalBackground: JSON.parse(educationalBackground),
    });

    const savedRequest = await coachRequest.save();

    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to create coach request." });
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

    // If status is "approved", create a new Coach entry
    if (status === "approved") {
      const {
        userId,
        cv,
        experience,
        educationalBackground,
        introductoryVideo,
      } = updatedRequest;

      const newCoach = new Coach({
        userId,
        cv,
        experience,
        educationalBackground,
        introductoryVideo,
        approvedDate: Date.now(),
      });

      await newCoach.save(); // Save the coach entry
    }

    // Respond with the updated request
    res.status(200).json(updatedRequest);
  } catch (err) {
    // Handle any errors that occur during the update
    console.error("Error saving new coach:", err);
    res.status(500).json({ error: "Failed to update coach request." });
  }
};
