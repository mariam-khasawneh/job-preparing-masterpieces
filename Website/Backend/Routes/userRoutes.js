const express = require("express");
const userController = require("../Controller/userController");
const { authenticateJWT } = require("../Middleware/authMiddleware");
const { UserRefreshClient } = require("google-auth-library");

const router = express.Router();

const upload = require("../Middleware/multer");

// Protected route le
// router.get("/profile", authenticateJWT, (req, res) => {
//   res.status(200).json({ message: `Welcome, ${req.user.user_name}` });
// });

// GET Routes
router.get("/profile", authenticateJWT, userController.getUserProfile);
router.get("/", userController.getAllUsers);
router.get("/count", userController.getUsersCount);
router.get("/inactive", userController.getInActive);
router.get("/active", userController.getInActive);
router.get("/:username", userController.getUser);

// PUT Routes
router.put(
  "/profile",
  authenticateJWT,
  upload.single("profilePicture"),
  userController.updateUserProfile
);
router.put("/:username", authenticateJWT, userController.updateUser);

module.exports = router;
