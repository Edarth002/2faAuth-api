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
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    const formatted = logs.map((log) => {
      let email = null;

      if (log.user && log.user.email) {
        email = log.user.email; // from relation
      } else if (log.details && log.details.startsWith("User: ")) {
        // fallback: extract from details string
        email = log.details.replace("User: ", "").trim();
      }

      return {
        ...log,
        user: email,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("Fetch logs failed:", err);
    res.status(500).json({ message: "Server error" });
  }
}
