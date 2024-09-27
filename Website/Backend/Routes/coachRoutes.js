const express = require("express");
const coachesController = require("../Controller/coachController");
const { authenticateJWT } = require("../Middleware/authMiddleware");

const router = express.Router();

//GET Routes=============

// Route to get all coaches
router.get("/", coachesController.getAllCoaches);
router.get("/coach/:userId", coachesController.getCoachIdByUserId);

//PATCH Routes=========

// Route to toggle coach activation
router.patch("/profile", authenticateJWT, coachesController.updateCoachProfile);
router.patch(
  "/:coachId/toggle-activation",
  coachesController.toggleCoachActivation
);

// Route to update LinkedIn, skills, and about
router.get("/profile", authenticateJWT, coachesController.getCoachProfile);

module.exports = router;
