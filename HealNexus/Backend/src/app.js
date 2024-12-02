import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authroutes from '../api/routes/auth.routes.js';
import profileroutes from '../api/routes/profile.route.js';
import adminroutes from '../api/routes/admin.routes.js';
import appointmentroutes from '../api/routes/appointments.routes.js';
import patientroutes from '../api/routes/patient.routes.js';
import Filterroutes from '../api/routes/Filter.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*', // Allows access from any URL
  credentials: true // Note: This is typically used for specific origins
}));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", authroutes);
app.use("/profile", profileroutes);
app.use("/admin", adminroutes);
app.use("/appointment", appointmentroutes);
app.use("/patient", patientroutes);
app.use("/", Filterroutes);

export default app; 
