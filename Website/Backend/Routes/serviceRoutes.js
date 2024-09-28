const express = require("express");
const serviceController = require("../Controller/serviceController");
const { authenticateJWT } = require("../Middleware/authMiddleware");

const router = express.Router();

// POST /api/services - Create a new service
router.post("/", authenticateJWT, serviceController.createService);

// GET /api/services - Get all services
router.get("/", serviceController.getAllServices);

// GET /api/services/:id - Get a specific service by ID
router.get("/:id", serviceController.getServiceById);

// PUT /api/services/:id - Update a service by ID
router.put("/:id", serviceController.updateService);

// DELETE /api/services/:id - Soft delete a service by ID
router.delete("/:id", serviceController.deleteService);

module.exports = router;
