const express = require("express");
const authController = require("../Controller/authController");
const authenticateJWT = require("../Middleware/authMiddleware");
const passport = require("passport");

const router = express.Router();

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleCallback
);

router.post("/signup", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/verify", authController.verifyToken);
router.post("/logout", authController.logout);

router.get(
  "/check-username/:username",
  authController.checkUsernameAvailability
);

router.get("/check-email/:email", authController.checkEmailAvailability);

module.exports = router;
