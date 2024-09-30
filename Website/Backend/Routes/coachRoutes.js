const express = require("express");
const coachesController = require("../Controller/coachController");
const { authenticateJWT } = require("../Middleware/authMiddleware");

const router = express.Router();

//GET Routes=============

// Route to get all coaches
router.get("/", coachesController.getAllCoaches);
router.get("/coach/:userId", coachesController.getCoachIdByUserId);
router.get("/profile", authenticateJWT, coachesController.getCoachProfile);
router.post("/details", coachesController.getCoachDetails);

//PATCH Routes=========

// Route to toggle coach activation
router.patch("/profile", authenticateJWT, coachesController.updateCoachProfile);
router.patch(
  "/:coachId/toggle-activation",
  coachesController.toggleCoachActivation
);

module.exports = router;
