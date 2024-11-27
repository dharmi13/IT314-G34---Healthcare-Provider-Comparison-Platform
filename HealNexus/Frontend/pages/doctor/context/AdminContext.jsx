import { createContext, useState } from 'react';
import React from 'react';
// Create AdminContext
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([
    { name: "Dr. John Smith", image: "src/assets/doctor.jpg", speciality: "Cardiologist" },
    { name: "Dr. Sarah Johnson", image: "src/assets/doctor.jpg", speciality: "Dermatologist" },
    {
      name: "Dr. Michael Brown",
      image: "src/assets/doctor.jpg",
      speciality: "Neurologist"
    },
    {
      name: "Dr. Emily Davis",
      image: "src/assets/doctor.jpg",
      speciality: "Pediatrician"
    },
    {
      name: "Dr. William Garcia",
      image: "src/assets/doctor.jpg",
      speciality: "Orthopedic Surgeon"
    }
  ]);

  const [unverifiedDoctors, setUnverifiedDoctors] = useState([
    { name: "Dr. John Eliyah", image: "src/assets/doctor.jpg", speciality: "Cardiologist" },
    { name: "Dr. Smith Johnson", image: "src/assets/doctor.jpg", speciality: "Dermatologist" },
    {
      name: "Dr. Michael white",
      image: "src/assets/doctor.jpg",
      speciality: "Neurologist"
    },
    {
      name: "Dr. brown Davis",
      image: "src/assets/doctor.jpg",
      speciality: "Pediatrician"
    },
    {
      name: "Dr. William johns",
      image: "src/assets/doctor.jpg",
      speciality: "Orthopedic Surgeon"
    }
  ]);

  // Function to verify a doctor
  const verifyDoctor = (doctor) => {
    setDoctors([...doctors, doctor]); // Add doctor to verified list
    setUnverifiedDoctors(unverifiedDoctors.filter((unverified) => unverified !== doctor)); // Remove doctor from unverified list
  };

  return (
    <AdminContext.Provider value={{ doctors, unverifiedDoctors, verifyDoctor }}>
      {children}
    </AdminContext.Provider>
  );
};