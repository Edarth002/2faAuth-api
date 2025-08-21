// controllers/authController.js
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/generateOTP.js";
import sendMail from "../utils/sendMail.js";

const prisma = new PrismaClient();

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.oTP.create({
      data: {
        code: otp,
        expiresAt,
        userId: user.id,
      },
    });

    // Send OTP via email
    await sendMail(
      user.email,
      "Your 2FA Code",
      `Your OTP code is ${otp}`,
      `<p>Your OTP code is <b>${otp}</b></p>`
    );

    res.status(200).json({ message: "OTP sent to email", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
