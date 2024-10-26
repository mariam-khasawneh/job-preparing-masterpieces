const mongoose = require("mongoose");
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const availabilitySchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlots: {
      type: [timeSlotSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

availabilitySchema.index({ coachId: 1, date: 1 }, { unique: true });

const Availability = mongoose.model(
  "Availability",
  availabilitySchema,
  "Availability"
);

module.exports = Availability;
