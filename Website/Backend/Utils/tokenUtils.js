const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(user) {
  const payload = {
    id: user._id,
    user_name: user.user_name,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });
}

module.exports = { createToken };
