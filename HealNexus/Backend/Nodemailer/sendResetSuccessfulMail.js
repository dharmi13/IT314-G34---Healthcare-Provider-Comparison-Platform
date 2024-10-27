import { PasswordResetSuccessTemplate } from "./emailTemplates.js";
import getErrorDetails from "../Utilites/errorCodes.js";
import nodemailer from 'nodemailer';

const SendResetSuccessfulMail = async (userName, email) => {
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
      html: PasswordResetSuccessTemplate.replace("{Username}", userName ?? "Error getting Username!"),
    };

    await transporter.sendMail(mailDetails);
    const code = getErrorDetails('SUCCESS', `Password Reset successful for ${email}`)
    console.log(code);

  } catch (error) {
    const code = getErrorDetails('INTERNAL_SERVER_ERROR', `(Resetting password) ${error}`)
    console.error(code);
  }
};

export default SendResetSuccessfulMail;