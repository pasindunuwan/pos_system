const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const verifyToken = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1]; // Fix token extraction
      if (!token) {
        return res
          .status(403)
          .json({ message: "Access Denied, no token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const user = await User.findOne({ username: decoded.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's role is allowed
      if (requiredRoles.length < 0 && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: "You do not have access" });
      }

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = verifyToken;
