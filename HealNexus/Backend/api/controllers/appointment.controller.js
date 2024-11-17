import Appointment from '../../data/models/appointment.models.js';
import PatientProfile from '../../data/models/profile/profile.patient.js';
import DoctorProfile from '../../data/models/profile/profile.doctor.js';
import mongoose from 'mongoose';

const bookAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { patientID, doctorID, slotTime, slotDate } = req.body;

    const patientData = await PatientProfile.findById(patientID).session(session);
    const doctorData = await DoctorProfile.findById(doctorID).session(session);

    if (!patientData || !doctorData) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Patient or Doctor not found" });
    }

    let slot_booked = doctorData.slot_booked;
    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        await session.abortTransaction();
        return res.json({ success: false, message: "Doctor not available at this time" });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      slot_booked[slotDate] = [slotTime];
    }

    const newAppointment = new Appointment({
      patientID,
      doctorID,
      amount: doctorData.consultationFee,
      slotDate,
      slotTime,
      date: Date.now(),
    });
    await newAppointment.save({ session });
    await DoctorProfile.findByIdAndUpdate(doctorID, { slot_booked });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const { userID } = req.params
    const appointments = await Appointment.find({ patientID: userID })
    const appointmentData = {
      slotDate: appointments.slotDate,
      slotTime: appointments.slotTime,
      amount: appointments.amount
    }

    res.json({ success: true, appointmentData });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message }); 
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userID, appointmentID } = req.body
    const appointmentData = await Appointment.findById(appointmentID);

    if (appointmentData.patientID != userID) {
      return res.json({ success: false, message: "Unauthorized Action" })
    }

    await Appointment.findByIdAndUpdate(appointmentID, { cancel: true });

    const { doctorID, slotDate, slotTime } = appointmentData
    const doctorData = await DoctorProfile.findById(doctorID)

    let slot_booked = doctorData.slot_booked;
    slot_booked[slotDate] = slot_booked[slotDate].filter(e => e != slotTime)

    await DoctorProfile.findByIdAndUpdate(doctorID, { slot_booked });
    res.json({ success: true, message: "Appointment cancelled" })

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message }); 
  }
}

export { bookAppointment, getPatientAppointments, cancelAppointment };