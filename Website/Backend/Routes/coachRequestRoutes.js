const express = require("express");
const coachRequestController = require("../Controller/coachRequestController");

const router = express.Router();

router.post("/new", coachRequestController.newRequest);
router.patch("/:requestId/review", coachRequestController.reviewRequest);

module.exports = router;