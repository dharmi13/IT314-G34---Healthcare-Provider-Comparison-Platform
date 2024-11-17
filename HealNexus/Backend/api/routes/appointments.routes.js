import express from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import { bookAppointment, getPatientAppointments, cancelAppointment } from '../controllers/appointment.controller.js';

const router = express.Router();
router.post("/book-appointment", verifyToken, bookAppointment);
router.get("/get-patient-appointments/:userID", verifyToken, getPatientAppointments);
router.post("/cancel-appointment", verifyToken, cancelAppointment);

export default router;
