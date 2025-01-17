import express from "express";
import { forgotPassword, resetPassword, login, register, verifyEmail } from "../controllers/authController.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;