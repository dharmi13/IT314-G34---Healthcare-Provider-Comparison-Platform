import { model, Schema, Types } from 'mongoose';

const appointmentSchema = new Schema({
    patientID: { type: Types.ObjectId, ref: 'PatientProfile'},
    doctorID: { type: Types.ObjectId, ref: 'DoctorProfile' },
    slotID: { type: Types.ObjectId, ref: 'slot' },
    status: { type: String,  enum: ['Booked', 'Cancelled', 'Pending'], default: 'Booked' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Appointment = model("appointment", appointmentSchema);
export default Appointment;