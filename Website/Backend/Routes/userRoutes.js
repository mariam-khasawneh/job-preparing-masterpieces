const express = require("express");
const userController = require("../Controller/userController");
const { authenticateJWT } = require("../Middleware/authMiddleware");
const { toggleUserActivation } = require("../Controller/userController");

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
router.get("/:username", userController.getUser);

// PUT Routes
router.put(
  "/profile",
  authenticateJWT,
  upload.single("profilePicture"),
  userController.updateUserProfile
);
router.put("/:username", authenticateJWT, userController.updateUser);

// PATCH Routes
router.patch(
  "/:username/toggle-activation",
  userController.toggleUserActivation
);

module.exports = router;
