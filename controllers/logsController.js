import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Create Logs
export async function createLog(req, res) {
  try {
    const { action, details, status } = req.body;

    const log = await prisma.activityLog.create({
      data: {
        action,
        details,
        status: status || "SUCCESS",
        userId: req.userId || null, // optional
        ip: req.ip,
      },
    });

    res.status(201).json({ message: "Log created", log });
  } catch (err) {
    console.error("Log creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get logs

export async function getLogs(req, res) {
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { timestamp: "desc" },
      take: 50,
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });

    res.json(
      logs.map((log) => ({
        id: log.id,
        timestamp: log.timestamp,
        action: log.action,
        details: log.details,
        status: log.status,
        ip: log.ip,
        user: log.user
          ? { id: log.user.id, email: log.user.email, name: log.user.name }
          : null,
      }))
    );
  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
