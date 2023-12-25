const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateToken = (userId) => {
  console.log(userId);
  const payload = {
    user: {
      id: userId.toString(),
    },
  };
  const token = jwt.sign(
    payload,
    config.jwtSecret,
    {
      expiresIn: "2 days",
    },
    { algorithm: "RS256" }
  );
  return token;
};

module.exports = {
  hashPassword,
  generateToken,
};
