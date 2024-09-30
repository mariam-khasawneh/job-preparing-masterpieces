const mongoose = require("mongoose");
const { Schema } = mongoose;

const educationalBackgroundSchema = new Schema({
  university: { type: String, required: true },
  credential: { type: String, required: true },
  major: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const coachRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    reviewDate: Date,
    comments: String,
    cv: {
      type: String, // URL or path to the CV file
      required: true,
    },
    experience: {
      type: String, // Text field to describe experience
      required: true,
    },
    educationalBackground: [educationalBackgroundSchema], // Array of educational background entries
    introductoryVideo: {
      type: String, // URL to the introductory video
      required: true,
    },
  },
  { timestamps: true }
);

const CoachRequest = mongoose.model(
  "CoachRequest",
  coachRequestSchema,
  "CoachRequests"
);
module.exports = CoachRequest;
