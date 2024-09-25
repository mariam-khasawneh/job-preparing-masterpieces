// /routes/messageRoutes.js
const express = require("express");
const { sendMessage } = require("../Controller/emailMessageController");

const router = express.Router();

// POST /api/send-message route
router.post("/", sendMessage);

module.exports = router;
