import { ResetPasswordEmailTemplate } from "./emailTemplates.js";
import getErrorDetails from "../Utilites/errorCodes.js";
import nodemailer from 'nodemailer';

const SendPasswordResetEmail = async (username, email, clientURL) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailDetails = {
      to: email,
      subject: 'Your Verification Code',
      html: ResetPasswordEmailTemplate.replace("{Username}", username ?? "Error getting Username!").replace("{ResetLink}", clientURL),
    };

    await transporter.sendMail(mailDetails);
  } catch (error) {
    const code = getErrorDetails('INTERNAL_SERVER_ERROR', `(Sending Password Reset Link) ${error}`)
    console.error(code);
  }
};

export default SendPasswordResetEmail;