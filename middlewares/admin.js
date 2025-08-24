// middleware/adminOnly.js
import jwt from "jsonwebtoken";

// ✅ Whitelisted admin emails
const adminEmails = ["dante@example.com", "arthuronyeanusi@gmail.com"];

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

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check email
    if (!adminEmails.includes(decoded.email)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Attach user info and continue
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Admin check failed:", err.message);
    return res.status(403).json({ message: "Forbidden" });
  }
}
