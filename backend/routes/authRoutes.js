import express from "express";
import { forgotPassword, resetPassword, login, register, verifyEmail, logout, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout)


router.get('/me', authMiddleware, getMe);

export default router;