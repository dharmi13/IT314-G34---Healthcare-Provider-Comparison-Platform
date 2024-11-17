import getErrorDetails from '../../Utilites/errorCodes.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../../data/models/user.model.js';
import { userRole } from '../../Utilites/options.js';
import GenerateVerificationCode from '../../Utilites/generateVerificationCode.js';
import GenerateJWTTokenAndCookie from '../../Utilites/generateJWTTokenAndCookie.js';
import SendVerificationCode from '../../Nodemailer/sendVerificationCode.js';
import SendWelcomeMail from '../../Nodemailer/sendWelcomeMail.js';
import SendPasswordResetEmail from '../../Nodemailer/sendPasswordResetEmail.js';
import SendResetSuccessfulMail from '../../Nodemailer/sendResetSuccessfulMail.js';

const signup = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword, role } = req.body;
    if(!userName || !email || !password || !confirmPassword || !role) {
      const error = getErrorDetails('BAD_REQUEST', 'All fields are necessary and cannot be empty!')
      return res.status(error.code).json({ message: error.message });
    }

    const EmailalreadyExists = await User.findOne({email});
    if(EmailalreadyExists) {
      const error = getErrorDetails('BAD_REQUEST', 'Email already Exists! Please choose a different Email!')
      return res.status(error.code).json({ message: error.message });
    }

    if(password !== confirmPassword) {
      const error = getErrorDetails('BAD_REQUEST', 'Passwords do not match!')
      return res.status(error.code).json({ message: error.message });
    }   
    
    if(!Object.values(userRole).includes(role)) {
      const error = getErrorDetails('BAD_REQUEST', 'Invalid User role!');
      return res.status(error.code).json({ message: error.message });
    }

    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = GenerateVerificationCode();
    
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
      verificationCode,
      verificationCodeExpiresAt: Date.now() +  15 * 60 * 1000
    });
    await newUser.save();
    GenerateJWTTokenAndCookie(newUser._id, res);

    const error = getErrorDetails('CREATED');
    res.status(error.code).json({ 
      message: 'User registered successfully'
    });
    await SendVerificationCode(newUser.userName, newUser.email, verificationCode);

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in Signup');
    console.log(error)
    return res.status(error_response.code).json({message : error_response.message});
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { ReceivedCode } = req.body;
    const user = await User.findOne({
      verificationCode: ReceivedCode,
      verificationCodeExpiresAt: { $gt: Date.now() }
    });
    
    if(!user) {
      const error = getErrorDetails('BAD_REQUEST', 'Invalid or Expired verification code');
      return res.status(error.code).json({ message: error.message });
    }

    if(user.isVerified) {
      const error = getErrorDetails('BAD_REQUEST', 'User already verified');
      return res.status(error.code).json({ message: error.message });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;
    await user.save();

    await SendWelcomeMail(user.email, user.userName)
    const error = getErrorDetails('SUCCESS');
    return res.status(error.code).send({
      sucesss: true,
      message: "Email Verified Successfully",
      role: user.role,
    });

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in email code verification');
    return res.status(error_response.code).json({message : error_response.message});
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      const error = getErrorDetails('BAD_REQUEST', 'Invalid E-mail address');
      return res.status(error.code).json({ message: error.message });
    } 

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();
    const error = getErrorDetails('SUCCESS', 'password reset link send successfully!');
    res.status(error.code).json({ message: error.message });

    await SendPasswordResetEmail(user.userName, user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in forget-password');
    return res.status(error_response.code).json({message : error_response.message});
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if(!user) {
      const error = getErrorDetails('BAD_REQUEST', 'Invalid or Expired Reset Token');
      return res.status(error.code).json({ message: error.message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await SendResetSuccessfulMail(user.userName, user.email);
    const error = getErrorDetails('SUCCESS', 'password reset successfull!');
    return res.status(error.code).json({ message: error.message });

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in reset-password');
    return res.status(error_response.code).json({message : error_response.message});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    const CheckPassword = await bcrypt.compare(password, user?.password ?? "");

    if(!user || !CheckPassword) {
      const error = getErrorDetails('UNAUTHORIZED', 'Invalid Credentials');
      return res.status(error.code).json({ message: error.message });
    }

    const error = getErrorDetails('SUCCESS');
    return res.status(error.code).send({
      userName: user.userName,
      email: user.email
    });

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in Login');
    return res.status(error_response.code).json({message : error_response.message});
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    const error = getErrorDetails('SUCCESS', 'Logged Out Successfully!');
    return res.status(error.code).json({message: error.message});

  } catch (error) {
    const error_response = getErrorDetails('INTERNAL_SERVER_ERROR', 'Error in Login');
    return res.status(error_response.code).json({message: error_response.message});
  }
};

const getuserDetails = async (req, res) => {
  try {
    const { userID } = req; 

    if (!userID) {
      const error_response = getErrorDetails('BAD_REQUEST', 'User ID is missing in the request');
      return res.status(error_response.code).json({ message: error_response.message });
    }

    const userDetails = await User.findById(userID);
    
    if (!userDetails) {
      const error_response = getErrorDetails('NOT_FOUND', 'User not found');
      return res.status(error_response.code).json({ message: error_response.message });
    }
    
    const response = {
      userName: userDetails.userName,
      email: userDetails.email,
      role: userDetails.role
    };

    const success = getErrorDetails('SUCCESS');
    return res.status(success.code).json(response);

  } catch (error) {
    const error_response = getErrorDetails(
      'INTERNAL_SERVER_ERROR',
      'Error in getting the profile for Patient'
    );
    return res.status(error_response.code).json({ message: error_response.message });
  }
};


export { signup, verifyEmail, forgetPassword, resetPassword, login, logout, getuserDetails };