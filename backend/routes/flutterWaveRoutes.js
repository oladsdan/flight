import express from 'express';
import { initializePayment, verifyPayment } from '../controllers/flutterWaveController.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post("/init", authMiddleware, initializePayment)

router.get("/verify", verifyPayment)



export default router
