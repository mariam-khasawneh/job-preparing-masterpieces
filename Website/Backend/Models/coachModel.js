const mongoose = require("mongoose");
const { Schema } = mongoose;

const coachSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cv: {
      type: String, // URL or path to the CV file
      required: true,
    },
    experience: {
      type: String, // Description of experience
      required: true,
    },
    educationalBackground: [
      {
        university: { type: String, required: true },
        credential: { type: String, required: true },
        major: { type: String, required: true },
        period: { type: String, required: true }, // E.g., "2010-2014"
      },
    ],
    introductoryVideo: {
      type: String, // URL to the introductory video
      required: true,
    },
    approvedDate: {
      type: Date,
      default: Date.now, // Date when they were approved
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
