const Joi = require("joi");

const registerSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required(),
  user_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string().uri().optional(),
  googleId: Joi.string().optional(),
  facebookId: Joi.string().optional(),
  bio: Joi.string().max(500).optional(),
});

const loginSchema = Joi.object({
  user_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).required(),
}).or("user_name", "email");

module.exports = { registerSchema, loginSchema };
