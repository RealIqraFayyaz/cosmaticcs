const { verifyToken } = require("../utils/jwt");
const { JWT_SECRET } = require("../config/env");
const { User } = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization ?? "";
    const [, token] = header.split(" ");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyToken(token, { secret: JWT_SECRET });
    const user = await User.findById(decoded.sub).select("-passwordHash");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { requireAuth, requireRole };

