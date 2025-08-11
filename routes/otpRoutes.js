import { Router } from "express";
const router = Router();
import { verifyOTP } from "../controllers/otpController";

router.post("/verify", verifyOTP);

export default router;
