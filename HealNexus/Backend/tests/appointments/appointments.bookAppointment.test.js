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
let adminToken; // Token for authorization
let patientToken; // Token for patient authorization

describe('Book Appointment Route Tests', () => {
  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    if (!process.env.SECRET_JWT_KEY) {
      process.env.SECRET_JWT_KEY = 'test-jwt-secret';
    }

    // Generate tokens for patient and admin
    adminToken = jwt.sign({ id: 'adminId123', role: 'admin' }, process.env.SECRET_JWT_KEY, { expiresIn: '1d' });
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

  test('POST /appointment/book-appointment - should successfully book appointment', async () => {
    const session = await mongoose.startSession(); // Start session for DB transaction
    session.startTransaction();

    try {
      // Create mock data for doctor and patient
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

      // Send POST request to book appointment
      const response = await request(app)
        .post('/appointment/book-appointment')
        .set('Cookie', `jwt=${patientToken}`)
        .send({
          doctorID: doctorProfile._id,
          slotDate: '2024-12-01',
          slotTime: '10:00 AM'
        });

      // Validate the response
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Appointment booked successfully');

      // Commit transaction
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error booking appointment:", error);
    }
  });

  test('POST /appointment/book-appointment - should return 400 if doctor or patient not found', async () => {
    const session = await mongoose.startSession(); // Start session for DB transaction
    session.startTransaction();

    try {
      // Send POST request with invalid doctorID
      const response = await request(app)
        .post('/appointment/book-appointment')
        .set('Cookie', `jwt=${patientToken}`)
        .send({
          doctorID: 'invalidDoctorId',
          slotDate: '2024-12-01',
          slotTime: '10:00 AM'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Patient or Doctor not found');

      // Commit transaction (although this test will not reach here if error occurs)
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error booking appointment:", error);
    }
  });

  test('POST /appointment/book-appointment - should return 400 if doctor is not available at this time', async () => {
    const session = await mongoose.startSession(); // Start session for DB transaction
    session.startTransaction();

    try {
      // Create mock data for doctor and patient
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
        slot_booked: {
          '2024-12-01': ['10:00 AM'] // Doctor is already booked at this time
        }
      });

      // Send POST request to book appointment for a time that is already booked
      const response = await request(app)
        .post('/appointment/book-appointment')
        .set('Cookie', `jwt=${patientToken}`)
        .send({
          doctorID: doctorProfile._id,
          slotDate: '2024-12-01',
          slotTime: '10:00 AM' // Already booked time
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Doctor not available at this time');

      // Commit transaction
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error booking appointment:", error);
    }
  });
});
