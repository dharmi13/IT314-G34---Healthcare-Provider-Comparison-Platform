import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken'; // For generating token
import app from '../../src/app'; // Adjust the path to your app.js or server.js
import PatientProfile from '../../data/models/profile/profile.patient.js';
import DoctorProfile from '../../data/models/profile/profile.doctor.js';
import Appointment from '../../data/models/appointment.models.js';
import User from '../../data/models/user.model.js';

let mongoServer;
let patientToken; // Token for patient authorization

describe('Confirm Appointment Route Tests', () => {
  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    if (!process.env.SECRET_JWT_KEY) {
      process.env.SECRET_JWT_KEY = 'test-jwt-secret';
    }

    // Generate tokens for patient
    patientToken = jwt.sign({ id: 'patientId123' }, process.env.SECRET_JWT_KEY, { expiresIn: '1d' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clear collections after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      try {
        await collections[key].deleteMany({});
      } catch (err) {
        console.error(`Error clearing collection ${key}:`, err);
      }
    }
  });

  test('PUT /appointment/pay-book-appointment/:appointmentID - should confirm appointment with payment', async () => {
    // Start session and transaction for DB transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create mock data for patient, doctor, and appointments
      const user = await User.create({
        userName: 'Patient User',
        email: 'patient@patient.com',
        password: 'password123',
        role: 'Patient',
        session,
      });

      const doctorUser = await User.create({
        userName: 'Doctor User',
        email: 'doctor@doctor.com',
        password: 'password123',
        role: 'Doctor',
        session,
      });

      const patientProfile = await PatientProfile.create({
        userID: user._id,
        age: 30,
        gender: 'Male',
        address: { street: '123 Main St', city: 'Metropolis', state: 'NY', postalCode: '10001', country: 'USA' },
        image: 'patient.jpg',
        session,
      });

      const doctorProfile = await DoctorProfile.create({
        userID: doctorUser._id,
        specialty: 'Cardiology',
        qualifications: ['MBBS', 'MD'],
        experience: 10,
        contactNumber: '1234567890',
        clinicAddress: { street: '456 Elm St', city: 'Gotham', state: 'NY', postalCode: '10002', country: 'USA' },
        image: 'doctor.jpg',
        slot_booked: {},
        session,
      });

      const appointment = await Appointment.create({
        patientID: patientProfile._id,
        doctorID: doctorProfile._id,
        slotDate: '2024-12-01',
        slotTime: '10:00 AM',
        amount: 100,
        cancel: false,
        payment: false,
        date: Date.now(),
        session,
      });

      // Send PUT request to confirm appointment and make payment
      const response = await request(app)
        .put(`/appointment/pay-book-appointment/${appointment._id}`)
        .set('Cookie', `jwt=${patientToken}`);

      // Validate the response
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Appointment booked with Payment');

      // Fetch the updated appointment data and validate the payment status
      const updatedAppointment = await Appointment.findById(appointment._id);
      expect(updatedAppointment.payment).toBe(true);

      // Validate the doctor's slot availability
      const updatedDoctor = await DoctorProfile.findById(doctorProfile._id);
      expect(updatedDoctor.slot_booked['2024-12-01']).not.toContain('10:00 AM');

      // Commit transaction
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error confirming appointment:", error);
    }
  });

});
