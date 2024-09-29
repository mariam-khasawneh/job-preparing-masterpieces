const mongoose = require("mongoose");
const { Schema } = mongoose;

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    answer: {
      type: String,
      required: true,
      minlength: 10,
    },
    category: {
      type: String,
      required: false, // Optional, in case you want to categorize FAQs
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
