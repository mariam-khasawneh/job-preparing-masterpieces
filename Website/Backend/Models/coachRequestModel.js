const mongoose = require("mongoose");
const { schema } = mongoose;

const coachRequestSchema = new Schema();

const CoachRequest = mongoose.model(
  "CoachRequesr",
  coachRequestSchema,
  "CoachRequests"
);
module.exports = CoachRequest;
