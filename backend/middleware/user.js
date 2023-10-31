const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isValidToken = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, 'your-secret-key');

    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      throw new Error("User not found");
    }

    next();
  } catch (error) {

    if (error.name === "JsonWebTokenError") {
      // Handle invalid token error
      return res.status(401).json({ error: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      // Handle expired token error
      return res.status(401).json({ error: "Token expired" });
    }

    // Handle other errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


