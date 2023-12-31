const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from the header
  const token = req.header("Authorization");
  // if token is not found
  if (!token) {
    res.status(401).json({
      token: 401,
      msg: "Authorization denied, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      msg: "Invalid token",
    });
  }
};