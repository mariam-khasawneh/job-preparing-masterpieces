const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    profilePicture: String,
    role: { type: String, enum: ["user", "coach", "admin"], default: "user" },
    bio: String,
    otp: String,
    otpExpiry: Date,
    googleId: String,
    facebookId: String,
    isDeleted: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;
