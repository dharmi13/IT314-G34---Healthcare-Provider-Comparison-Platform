import { VerificationCodeTemplate } from "./emailTemplates.js";
import getErrorDetails from "../Utilites/errorCodes.js";
import nodemailer from 'nodemailer';

const SendVerificationCode = async (username, email, verificationCode) => {
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
      html: VerificationCodeTemplate.replace("{Verification Code}", verificationCode ?? "Internal Error!").replace("{Username}", username ?? "Error getting Username!"),
    };

    await transporter.sendMail(mailDetails);
    const code = getErrorDetails('SUCCESS', `Verification email sent to ${email}`)
    console.log(code);

  } catch (error) {
    const code = getErrorDetails('INTERNAL_SERVER_ERROR', `(Email code Verification) ${error}`)
    console.error(code);
  }
};

export default SendVerificationCode;