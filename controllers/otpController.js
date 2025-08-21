// controllers/otpController.js
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function verifyOTP(req, res) {
  try {
    const { userId, otp } = req.body;

    const otpRecord = await prisma.otp.findFirst({
      where: { userId, code: otp },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

    if (new Date() > otpRecord.expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP valid, generate JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Delete OTP after verification
    await prisma.otp.delete({ where: { id: otpRecord.id } });

    res.status(200).json({ message: "OTP verified", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
