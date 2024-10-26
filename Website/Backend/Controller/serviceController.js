const Service = require("../Models/serviceModel");
const User = require("../Models/userModel");
// const Coach = require("../Models/coachModel");
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

// Get all services with coach's full name
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate({
      path: "coachId",
      select: "userId", // Select the userId to access the User model
      populate: {
        path: "userId", // Populate the User model through userId
        select: "full_name user_name", // Select the full name from the User model
      },
    });

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

// Get services for a specific coach by user ID
exports.getCoachServices = async (req, res) => {
  console.log("User ID from request:", req.user.id);
  try {
    const userId = req.user.id;

    // Get the coach ID using the user ID
    const coachId = await coachController.getCoachIdByUserId(userId);
    if (!coachId) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Find services associated with the coach ID
    const services = await Service.find({ coachId, isDeleted: false });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this coach" });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to get coach services", error });
    console.log(error);
  }
};

// Get services for a specific coach by coach ID
exports.getServicesByCoachId = async (req, res) => {
  const { coachId } = req.body;

  try {
    const services = await Service.find({ coachId, isDeleted: false });

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this coach" });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve services", error });
    console.log(error);
  }
};
