// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


function generateToken (userId, userRole) {
    try {
        const token = jwt.sign(
            {id: userId, role: userRole},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1h"}
        )
        return token;
    } catch (error) {
        console.log({ message: error.message })
    }
}

export default generateToken;