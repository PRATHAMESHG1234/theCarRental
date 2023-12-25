const config = require("../config/default.json");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  //Get jwttoken from header
  const token = req.header("token");
  // console.log('req.body:', token);

  console.log("user", token);
  //check if no token

  if (!token) {
    console.log(res);
    return res
      .status(400)
      .json({ success: false, msg: "No token , authorization denied" });
  }

  //Verify token

  try {
    const decoded = jwt.verify(token, config.jwtSecret, { algorithm: "RS256" });
    console.log(decoded.user);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, msg: "token is not valid" });
  }
};

module.exports = {
  verifyToken,
};
