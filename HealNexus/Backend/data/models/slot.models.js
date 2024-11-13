import { model, Schema, Types } from 'mongoose';

const slotSchema = new Schema({
    doctorID: { type: Types.ObjectId, ref: 'DoctorProfile' },
    date: { type: [Date] },
    time: { type: [Date] },
    is_available: { type: Boolean, default: true }
}, { timestamps: true });

const Slot = model("slot", slotSchema);
export default Slot;
