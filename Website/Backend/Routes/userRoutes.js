const express = require("express");
const userController = require("../Controller/userController");
const {
  authenticateJWT,
  localVariables,
} = require("../Middleware/authMiddleware");
const { UserRefreshClient } = require("google-auth-library");

const router = express.Router();

// Protected route le
router.get("/profile", authenticateJWT, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.user_name}` });
});
router.get("/", userController.getAllUsers);
router.get("/count", userController.getUsersCount);
router.get("/inactive", userController.getInActive);
router.get("/active", userController.getInActive);
router.get("/:username", userController.getUser);
router.put("/:username", authenticateJWT, userController.updateUser);

module.exports = router;
