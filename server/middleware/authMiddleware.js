const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id || decoded.user || decoded._id,
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
