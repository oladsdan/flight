import express from "express";
import { createBooking, deleteBooking, getAllBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const router = express.Router();


router.post("/create-booking", authMiddleware, createBooking)
//router for deletebooking
router.delete("/delete-booking/:bookingId", authMiddleware, deleteBooking)

router.get("/get-all-bookings", authMiddleware, getAllBookings)

export default router