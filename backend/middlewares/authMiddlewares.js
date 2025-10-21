import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export const verifyCookieToken = async (req, res, next) => {
  const token = req.cookies['auth-token'];
  console.log("Token from cookies:", token);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

