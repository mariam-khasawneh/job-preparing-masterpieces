const Coach = require("../Models/coachModel");
const User = require("../Models/userModel");

// Get all coaches
exports.getAllCoaches = async (req, res) => {
  try {
    // Retrieve all coaches that are not deleted
    const coaches = await Coach.find({ isDeleted: false })
      .populate("userId", "full_name user_name email role")
      .exec();

    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving coaches", error });
  }
};

// Toggle Coach Activation
// exports.toggleCoachActivation = async (req, res) => {
//   const { coachId } = req.params;

//   try {
//     // Find the coach by ID
//     const coach = await Coach.findById(coachId);
//     if (!coach) {
//       return res.status(404).json({ message: "Coach not found" });
//     }

//     // Deactivate the coach
//     coach.isActivated = false;
//     await coach.save();

//     // Find the user associated with the coach and update their role
//     const user = await User.findById(coach.userId);
//     if (user) {
//       user.role = "user";
//       await user.save();
//     }

//     res
//       .status(200)
//       .json({ message: "Coach deactivated and user role updated to 'user'" });
//   } catch (error) {
//     res.status(500).json({ message: "Error toggling coach activation", error });
//   }
// };
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
