// server.js
import "dotenv/config"; // replaces require("dotenv").config()
import express, { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import logRoutes from "./routes/logsRoute.js";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(json());

app.use("/api", authRoutes);
app.use("/api", otpRoutes);
app.use("/api", logRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
