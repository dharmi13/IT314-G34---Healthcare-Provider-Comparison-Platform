import express from 'express';
import {
  createAdminProfile,
  updateAdminProfile,
  getAdminProfile,
  createPatientProfile,
  updatePatientProfile,
  getPatientProfile,
  createDoctorProfile,
  updateDoctorProfile,
  getDoctorProfile,
  createLabTechnicianProfile,
  updateLabTechnicianProfile,
  getLabTechnicianProfile,
  createPharmacistProfile,
  updatePharmacistProfile,
  getPharmacistProfile,
} from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/create-admin', createAdminProfile);
router.put('/update-admin/:id', updateAdminProfile);
router.get('/get-admin/:id', getAdminProfile);

router.post('/create-patient', createPatientProfile);
router.put('/update-patient/:id', updatePatientProfile);
router.get('/get-patient/:id', getPatientProfile);

router.post('/create-doctor', createDoctorProfile);
router.put('/update-doctor/:id', updateDoctorProfile);
router.get('/get-doctor/:id', getDoctorProfile);

router.post('/create-lab-technician', createLabTechnicianProfile);
router.put('/update-lab-technician/:id', updateLabTechnicianProfile);
router.get('/get-lab-technician/:id', getLabTechnicianProfile);

router.post('/create-pharmacist', createPharmacistProfile);
router.put('/update-pharmacist/:id', updatePharmacistProfile);
router.get('/get-pharmacist/:id', getPharmacistProfile);

export default router;
