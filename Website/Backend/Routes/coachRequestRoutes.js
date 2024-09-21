const express = require("express");
const coachRequestController = require("../Controller/coachRequestController");
const router = express.Router();
const upload = require("../Middleware/multer");

router.post(
  "/new",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  coachRequestController.newRequest
);
router.patch("/:requestId/review", coachRequestController.reviewRequest);

module.exports = router;
