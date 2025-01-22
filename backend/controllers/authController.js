
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import generateToken from "../middlewares/generateToken.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail } from "../utils/mailer.js";
import crypto from "crypto";


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

    // an otp can be generated here and sent to the user email for verification
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newUser = await prisma.user.create({ data: { email: lowerCaseEmail, 
      password: hashedPassword, 
      name, 
      role: "USER",
      verificationToken : verificationToken,
      verificationTokenExpiresAt:new Date(Date.now() + 24 * 60 * 60 * 1000)   } });
    

    if(!newUser) return res.status(400).json({ success: false, message: "Unable to create user account please try again" }); 

    // send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ success: true, message: "User created successfully", user: {...newUser, password: undefined} });
  } catch (error) {
    res.status(500).json(error);
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
    res.cookie("auth-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 });
    // return res.header("auth-token", token).status(200).json({success: true, message:"You are now logged in", token: token});

    res.status(200).json({ success: true, message: "You are now logged in", token: token, user: {...user, password: undefined} });
  
  } catch (error) {
    res.status(400).json({ success: false, message: "Unable to login user account please try again" });
  }

}


export const verifyEmail = async (req, res) => {
  const { email,  verificationToken } = req.body;
  
  try{
    // const user = await prisma.user.findUnique({
    //   where: {
    //     AND: [
    //       { verificationToken: verificationToken },
    //       { verificationTokenExpiresAt: { gt: new Date() } }
    //     ]
    //   }
    // });
    // const user = await prisma.user.findFirst({
    //   where: {
    //     AND: [
    //       { verificationToken: verificationToken },
    //       { verificationTokenExpiresAt: { gt: new Date() } }
    //     ]
    //   }
    // });

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        verificationToken: verificationToken,
        verificationTokenExpiresAt: { gt: new Date() }
      }
    });


    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'Invalid verification token' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null, verificationTokenExpiresAt: null },
    });

    if (!updatedUser) {
      return res.status(500).json({ error: 'Unable to verify email' });
    }


    res.status(200).json({ success: true, message: "Email verified successfully", user: {...updatedUser, password: undefined} });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Unable to verify email please try again" });

  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await prisma.user.findUnique({ where: { email: lowerCaseEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken: resetToken, resetPasswordExpiresAt: resetTokenExpiresAt },
    });

  

    if (!updatedUser) {
      return res.status(500).json({ error: 'Unable to reset password' });   
    }

    // Send reset password email
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ success: true, message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to reset password please try again" });
  }
    
}

export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    console.log(token)
    const {password} = req.body;

    const user = await prisma.user.findFirst({
      where: {
        AND: [
          { resetPasswordToken: token },
          { resetPasswordExpiresAt: { gt: new Date() } }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Invalid reset password token' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetPasswordToken: null, resetPasswordExpiresAt: null },
    });

    if (!updatedUser) {
      return res.status(500).json({ error: 'Unable to reset password' });
    }

    await sendResetSuccessEmail(updatedUser.email)

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to reset password please try again" });
  
  }
}


export const logout = async (req, res) => {
	res.clearCookie("auth-token", {httpOnly:true, secure:true});
	res.status(200).json({ success: true, message: "Logged out successfully" });
  // res.clearCookie("refreshToken", { httpOnly:true, secure:true})
};












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