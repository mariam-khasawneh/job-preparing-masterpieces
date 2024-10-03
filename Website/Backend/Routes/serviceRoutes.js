const express = require("express");
const serviceController = require("../Controller/serviceController");
const { authenticateJWT } = require("../Middleware/authMiddleware");

const router = express.Router();

// POST /api/services - Create a new service
router.post("/", authenticateJWT, serviceController.createService);

// POST /api/services - Get all services by coachId
router.post("/coach", serviceController.getServicesByCoachId);

// GET /api/services - Get all services
router.get("/", serviceController.getAllServices);

// GET /api/services/:id - Get a specific service by ID
router.get("/:id", serviceController.getServiceById);

// PUT /api/services/:id - Update a service by ID
router.put("/:id", serviceController.updateService);

// DELETE /api/services/:id - Soft delete a service by ID
router.delete("/:id", serviceController.deleteService);

// GET /api/services/coach-services
router.get("/coach-services", serviceController.getCoachServices);

module.exports = router;
