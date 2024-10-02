import express from 'express';
import dotenv from 'dotenv';
import connectToDB from '../data/database/connectToDB.js';
import cookieParser from 'cookie-parser';
import authroutes from '../api/routes/auth.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authroutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`The Server is Running on Port: ${PORT}`);
});

