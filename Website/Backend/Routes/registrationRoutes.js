const express = require("express");
const registrationController = require("../Controller/registrationController");
const authenticateJWT = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registrationController.registerUser);
router.post("/login", registrationController.loginUser);
router.get(
  "/check-username/:username",
  registrationController.checkUsernameAvailability
);

router.get(
  "/check-email/:email",
  registrationController.checkEmailAvailability
);

module.exports = router;
