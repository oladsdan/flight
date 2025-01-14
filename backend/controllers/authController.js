
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import generateToken from "../middlewares/generateToken.js";


const prisma = new PrismaClient();


export const register = async(req , res) => {
  const { email, password, name } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  try {
    const users = await prisma.user.findUnique({ where: { email: lowerCaseEmail } });
    if (users) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // get the sail
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({ data: { email: lowerCaseEmail, password: hashedPassword, name, role: "USER"  } });

    if(!newUser) return res.status(400).json({ success: false, message: "Unable to create user account please try again" }); 
    res.status(201).json({ success: true, message: "User created successfully", data: newUser});
  } catch (error) {
    res.status(400).json(error);
  }
}


export const login = async(req, res) => {
  const { email, password } = req.body;   
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await prisma.user.findUnique({ where: { email: lowerCaseEmail } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.role);
    return res.header("auth-token", token).status(200).json({success: true, message:"You are now logged in", token: token});
  
  } catch (error) {
    res.status(400).json({ success: false, message: "Unable to login user account please try again" });
  }

}








// export const register = async (req, res) => {
//   const { email, password, name } = req.body;
//   const lowerCaseEmail = email.toLowerCase();

//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await createUser({ email:lowerCaseEmail, password: hashedPassword, name });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json(error);
//   }

// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   const lowerCaseEmail = email.toLowerCase();
//   const user = await findUserByEmail(lowerCaseEmail);
//   if (!user) {
//     return res.status(404).json({ error: 'Invalid email or password' });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(404).json({ error: 'Invalid email or password' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//   res.json({ token });
// };

// module.exports = {
//   register,
//   login,
// };