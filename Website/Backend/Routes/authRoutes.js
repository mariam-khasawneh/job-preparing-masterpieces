const express = require("express");
const authController = require("../Controller/authController");
const authenticateJWT = require("../Middleware/authMiddleware");

const router = express.Router();

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
