import Appointment from '../models/Appointment';
import PatientProfile from '../models/PatientProfile';
import DoctorProfile from '../models/DoctorProfile';
import Slot from '../models/Slot';
import mongoose from 'mongoose';

export const bookAppointment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { patientID, doctorID, slotID } = req.body;

        const patient = await PatientProfile.findById(patientID).session(session);
        const doctor = await DoctorProfile.findById(doctorID).session(session);

        if (!patient || !doctor) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Patient or Doctor not found" });
        }

        const slot = await Slot.findOne({ _id: slotID, isAvailable: true }).session(session);
        if (!slot) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Selected slot is not available" });
        }

        const newAppointment = new Appointment({
            patientID,
            doctorID,
            slotID,
            status: 'Booked'
        });
        await newAppointment.save({ session });

        slot.isAvailable = false;
        await slot.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Failed to book appointment" });
    }
};
