const express = require("express");
const coachRequestController = require("../Controller/coachRequestController");
const router = express.Router();
const upload = require("../Middleware/multer");

// New coach request
router.post("/new", coachRequestController.newRequest);

// Review coach request
router.patch("/:requestId/review", coachRequestController.reviewRequest);

// Route to get all coach requests or filter by status (pending, approved, rejected)
router.get("/", coachRequestController.getAllRequests);
module.exports = router;
