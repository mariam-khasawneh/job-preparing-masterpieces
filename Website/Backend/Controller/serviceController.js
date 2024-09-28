const Service = require("../Models/serviceModel");
const User = require("../Models/userModel");
const Coach = require("../Models/coachModel");
const coachController = require("../Controller/coachController");

// Create a new service
exports.createService = async (req, res) => {
  console.log("User ID from request:", req.user.id);
  try {
    const userId = req.user.id;
    console.log("Attempting to update user with ID:", userId);

    const user = await User.findById(userId);
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const coachId = await coachController.getCoachIdByUserId(userId);
    console.log("coach Id : ", coachId);

    const { service, description, price, currency, duration, serviceType } =
      req.body;
    const newService = new Service({
      coachId,
      service,
      description,
      price,
      currency,
      duration,
      serviceType,
    });

    const savedService = await newService.save();
    res.status(201).json({ service: savedService });
  } catch (error) {
    res.status(500).json({ message: "Failed to create service", error });
    console.log(error);
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("coachId", "full_name"); // Populate coach's name
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to get services", error });
  }
};

// Get a specific service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "coachId",
      "full_name"
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to get service", error });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: "Failed to update service", error });
  }
};

// Delete a service by ID (soft delete)
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted", deletedService });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service", error });
  }
};
