const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    coachId: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        "Consultation",
        "Resume Review",
        "Interview Preparation",
        "Career Guidance",
      ],
      required: true,
    },
    maxParticipants: {
      type: Number,
      default: 1,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "JOD", "AUD", "CAD", "INR", "JPY", "CNY"],
      default: "JOD",
    },
    duration: {
      type: String,
      enum: ["30 minutes", "1 hour", "90 minutes", "2 hours"],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    // bookingLink: {
    //   type: String, // URL for booking the service
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema, "Services");
module.exports = Service;
