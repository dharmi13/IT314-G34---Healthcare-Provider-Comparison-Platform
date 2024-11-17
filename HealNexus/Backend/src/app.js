import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authroutes from '../api/routes/auth.routes.js';
import profileroutes from '../api/routes/profile.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", authroutes);
app.use("/profile", profileroutes);

export default app; 
