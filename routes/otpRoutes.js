import { Router } from "express";
const router = Router();
import { verifyOTP } from "../controllers/otpController.js";

router.post("/auth/verify", verifyOTP);

export default router;
