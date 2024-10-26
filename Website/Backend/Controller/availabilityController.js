const Availability = require("../Models/availabilityModel");
const coachController = require("../Controller/coachController");
const User = require("../Models/userModel");

exports.getAvailability = async (req, res) => {
  console.log("Request body:", req.body); // to see incoming data
  try {
    const userId = req.user.id;
    console.log("Attempting to update user with ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const coachId = await coachController.getCoachIdByUserId(userId);
    if (!coachId) {
      console.log("Coach ID not found for user:", userId);
      return res.status(404).json({ message: "Coach not found" });
    }

    const availability = await Availability.find({ coachId }).sort({
      date: -1,
    }); // Sort by date in descending order

    res.json(availability);
  } catch (error) {
    console.error("Error in getAvailability:", error);
    res.status(500).json({ message: "Failed to fetch availability records" });
  }
};

exports.setAvailability = async (req, res) => {
  console.log("Request body:", req.body); // to see incoming data
  try {
    const userId = req.user.id;
    console.log("Attempting to update user with ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const coachId = await coachController.getCoachIdByUserId(userId);
    if (!coachId) {
      console.log("Coach ID not found for user:", userId);
      return res.status(404).json({ message: "Coach not found" });
    }

    // Validate the incoming data
    if (!req.body.date || !req.body.timeSlots) {
      console.log("Missing required fields:", req.body);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const availability = new Availability({
      coachId,
      date: req.body.date,
      timeSlots: req.body.timeSlots,
    });

    console.log("Attempting to save availability:", availability); // Add this log
    const newAvailability = await availability.save();
    console.log("Saved availability:", newAvailability); // Add this log

    res.status(201).json(newAvailability);
  } catch (error) {
    console.error("Error in setAvailability:", error); // Better error logging
    res.status(500).json({
      message: "Failed to create availability",
      error: error.message,
    });
  }
};

// exports.editAvailability = async (req, res) => {
//   try {
//     const updatedAvailability = await Availability.findByIdAndUpdate(
//       req.params.id,
//       {
//         date: req.body.date,
//         timeSlots: req.body.timeSlots,
//       },
//       { new: true }
//     );
//     res.json(updatedAvailability);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.editAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    if (!date || !timeSlots) {
      return res.status(400).json({
        message: "Date and timeSlots are required",
      });
    }

    // Validate date format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    // Find and update in one operation
    const updatedAvailability = await Availability.findOneAndUpdate(
      {
        date: parsedDate,
        coachId: req.user.coachId,
      },
      {
        $set: { timeSlots: timeSlots },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAvailability) {
      return res.status(404).json({
        message: "Availability record not found for this date",
      });
    }

    res.json(updatedAvailability);
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
