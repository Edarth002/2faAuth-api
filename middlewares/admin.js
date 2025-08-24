// middleware/adminOnly.js
import jwt from "jsonwebtoken";

// ✅ Whitelisted admin user IDs
const adminUserIds = [1, 2]; // example: userId 1 and 2 are admins

export function adminOnly(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded);

    // ✅ Check userId instead of email
    if (!decoded.userId || !adminUserIds.includes(decoded.userId)) {
      console.warn("Forbidden: user not admin →", decoded.userId);
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Admin check failed:", err.message);
    return res.status(403).json({ message: "Forbidden" });
  }
}
