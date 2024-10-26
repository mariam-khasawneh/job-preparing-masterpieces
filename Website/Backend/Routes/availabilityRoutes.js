const express = require("express");
const availabilityController = require("../Controller/availabilityController");
const { authenticateJWT } = require("../Middleware/authMiddleware");

const router = express.Router();

//coach routes
router.get("/", authenticateJWT, availabilityController.getAvailability);
router.post("/", authenticateJWT, availabilityController.setAvailability);
router.put("/:id", authenticateJWT, availabilityController.editAvailability);

module.exports = router;
