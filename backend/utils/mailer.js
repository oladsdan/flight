import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE  } from "./emailTemplates.js";

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})



export const sendVerificationEmail = async (email, verificationToken) => {
   

    try {
        //the mailoptions
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Email verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            
        }
        
        //send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

    } catch (error) {
        console.error('Error sending email: ', error);

        throw new Error(`Error sending verification email: ${error}`);
    }


    
}


export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        //the mailoptions
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        }
        
        //send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

    } catch (error) {
        console.error('Error sending email: ', error);

        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) =>{

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        }    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
    }
   
}


