// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"
import dotenv from "dotenv";

dotenv.config();


const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//built-in middleware for json
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api-booking', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});