const Joi = require("joi");

// Define the schema for educational background
const educationalBackgroundSchema = Joi.object({
  university: Joi.string().required(),
  credential: Joi.string().required(),
  major: Joi.string().required(),
  period: Joi.string().required(),
});

// Define the schema for the CoachRequest
const coachRequestSchema = Joi.object({
  userId: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending"),
  requestDate: Joi.date().default(Date.now),
  reviewDate: Joi.date().allow(null),
  comments: Joi.string().allow(""),
  cv: Joi.string(), //.required(), // Assuming cv is a URL
  experience: Joi.string().required(),
  educationalBackground: Joi.array()
    .items(educationalBackgroundSchema)
    .required(),
  introductoryVideo: Joi.string().uri().required(), // Assuming video is a URL
});

module.exports = coachRequestSchema;
