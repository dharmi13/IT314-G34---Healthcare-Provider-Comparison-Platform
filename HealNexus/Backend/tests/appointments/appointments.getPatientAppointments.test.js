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

describe('Get Patient Appointments Route Tests', () => {
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

  test('GET /appointment/get-patient-appointments - should return all patient appointments with doctor details', async () => {
    const session = await mongoose.startSession(); // Start session for DB transaction
    session.startTransaction();

    try {
      // Create mock data for patient, doctor, and appointments
      const user = await User.create({
        userName: 'Patient User',
        email: 'patient@patient.com',
        password: 'password123',
        role: 'Patient',
      });

      const doctorUser = await User.create({
        userName: 'Doctor User',
        email: 'doctor@doctor.com',
        password: 'password123',
        role: 'Doctor',
      });

      const patientProfile = await PatientProfile.create({
        userID: user._id,
        age: 30,
        gender: 'Male',
        address: { street: '123 Main St', city: 'Metropolis', state: 'NY', postalCode: '10001', country: 'USA' },
        image: 'patient.jpg',
      });

      const doctorProfile = await DoctorProfile.create({
        userID: doctorUser._id,
        specialty: 'Cardiology',
        qualifications: ['MBBS', 'MD'],
        experience: 10,
        contactNumber: '1234567890',
        clinicAddress: { street: '456 Elm St', city: 'Gotham', state: 'NY', postalCode: '10002', country: 'USA' },
        image: 'doctor.jpg',
        slot_booked: {}
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
      });

      // Send GET request to fetch patient appointments
      const response = await request(app)
        .get('/appointment/get-patient-appointments')
        .set('Cookie', `jwt=${patientToken}`);

      // Validate the response
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.allAppointmentsData).toHaveLength(1);
      expect(response.body.allAppointmentsData[0]).toHaveProperty('appointmentData');
      expect(response.body.allAppointmentsData[0]).toHaveProperty('doctorData');

      const appointmentData = response.body.allAppointmentsData[0].appointmentData;
      const doctorData = response.body.allAppointmentsData[0].doctorData;

      // Check appointment data
      expect(appointmentData).toHaveProperty('id', appointment._id.toString());
      expect(appointmentData).toHaveProperty('slotDate', appointment.slotDate);
      expect(appointmentData).toHaveProperty('slotTime', appointment.slotTime);

      // Check doctor data
      expect(doctorData).toHaveProperty('image', doctorProfile.image);
      expect(doctorData).toHaveProperty('userName', doctorUser.userName);
      expect(doctorData).toHaveProperty('specialty', doctorProfile.specialty);
      expect(doctorData.address).toHaveProperty('street', doctorProfile.clinicAddress.street);
      expect(doctorData.address).toHaveProperty('city', doctorProfile.clinicAddress.city);

      // Commit transaction
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error fetching patient appointments:", error);
    }
  });

 
});
