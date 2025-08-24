import express from "express";
import { createLog, getLogs } from "../controllers/logsController.js";
import { adminOnly } from "../middlewares/admin.js";

const router = express.Router();

// POST /api/logs → add new log
router.post("/auth/logs", createLog);

// GET /api/logs → fetch logs
router.get("/auth/logs", adminOnly, getLogs);

export default router;
