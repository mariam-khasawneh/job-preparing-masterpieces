const CoachRequest = require("../Models/coachRequestModel");
const coachRequestValidation = require("../Validators/coachRequestValidator"); // Ensure this line is present
const Coach = require("../Models/coachModel");

// Create a new coach request

// exports.newRequest = (req, res) => {
//   // Log the request body and uploaded files for debugging
//   console.log("Request Body:", req.body);
//   console.log("Uploaded Files:", req.files); // Use req.files since we use upload.fields()

//   // Validate the request body
//   const { error } = coachRequestValidation.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   // Extract the data
//   const { userId, experience, educationalBackground, introductoryVideo } =
//     req.body;

//   // Access uploaded files
//   const cvPath = req.files.cv ? req.files.cv[0].path : null; // Accessing the CV file path
//   const videoPath = req.files.video ? req.files.video[0].path : null; // Accessing the video file path

//   // Check if required files are present
//   if (!cvPath) {
//     return res.status(400).json({ error: "CV file is required." });
//   }

//   // Prepare the data to save in the database
//   const newRequest = new CoachRequest({
//     userId,
//     experience,
//     educationalBackground: JSON.parse(educationalBackground), // Ensure this is an array
//     cv: cvPath,
//     introductoryVideo: videoPath || introductoryVideo, // Use uploaded video if present
//   });

//   // Save to the database
//   newRequest
//     .save()
//     .then(() =>
//       res.status(201).json({ message: "Request created successfully!" })
//     )
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ error: "An error occurred while saving the request." })
//     );
// };

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

    res.status(201).json({ success: true, data: newCoachRequest });
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
    console.error("Error saving new coach:", err);
    res.status(500).json({ error: "Failed to update coach request." });
  }
};
