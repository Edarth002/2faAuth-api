require("dotenv").config();
import express, { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes";
import otpRoutes from "./routes/otpRoutes";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(json());

app.use("/api", authRoutes);
app.use("/api", otpRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
