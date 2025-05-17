import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const router = express.Router();


router.post("/create-booking", authMiddleware, createBooking)
router.get("/get-all-bookings", authMiddleware, getAllBookings)

export default router