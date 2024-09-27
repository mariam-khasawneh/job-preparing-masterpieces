const express = require("express");
const coachesController = require("../Controller/coachController");

const router = express.Router();

//GET Routes
// Route to get all coaches
router.get("/", coachesController.getAllCoaches);

//PATCH Routes
// Route to toggle coach activation
router.patch(
  "/:coachId/toggle-activation",
  coachesController.toggleCoachActivation
);

module.exports = router;
