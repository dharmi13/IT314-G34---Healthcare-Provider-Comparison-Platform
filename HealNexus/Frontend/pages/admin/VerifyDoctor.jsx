import React, { useState } from 'react';
import Navbar from '../../components/admin/Navbar.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';

const UnverifiedDoctor = () => {
  // Local state for unverified doctors
  const [unverifiedDoctors, setUnverifiedDoctors] = useState([
    { name: "Dr. John Eliyah", image: "src/assets/doctor.jpg", speciality: "Cardiologist" },
    { name: "Dr. Smith Johnson", image: "src/assets/doctor.jpg", speciality: "Dermatologist" },
    { name: "Dr. Michael White", image: "src/assets/doctor.jpg", speciality: "Neurologist" },
    { name: "Dr. Brown Davis", image: "src/assets/doctor.jpg", speciality: "Pediatrician" },
    { name: "Dr. William Johns", image: "src/assets/doctor.jpg", speciality: "Orthopedic Surgeon" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for selected doctor
  const [verifiedDoctors, setVerifiedDoctors] = useState([]); // State for verified doctors

  // Handle showing the profile of a doctor
  const showDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Handle returning to the list of unverified doctors
  const goBackToList = () => {
    setSelectedDoctor(null);
  };

  // Handle approving a doctor
  const verifyDoctor = (doctor) => {
    setVerifiedDoctors([...verifiedDoctors, doctor]); // Add doctor to verified list
    setUnverifiedDoctors(unverifiedDoctors.filter((item) => item !== doctor)); // Remove doctor from unverified list
  };

  // Handle rejecting a doctor
  const rejectDoctor = (doctor) => {
    setUnverifiedDoctors(unverifiedDoctors.filter((item) => item !== doctor)); // Remove doctor from unverified list
  };

  if (selectedDoctor) {
    // Show profile view of the selected doctor
    return (
      <div>
        <Navbar />
        <div className="flex items-start bg-[#F8F8FF]">
          <Sidebar />
          <div className="m-5">
            <h1 className="text-lg font-medium">Doctor Profile</h1>
            <div className="border border-indigo-200 rounded-xl p-4 max-w-md">
              <img className="bg-indigo-50" src={selectedDoctor.image} alt="doctor" />
              <div className="pt-4">
                <p className="text-neutral-800 text-lg font-medium">{selectedDoctor.name}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.speciality}</p>
              </div>
              <div className="mt-4">
                <button
                  style={{ color: 'white', backgroundColor: 'green', marginRight: '10px', width: '70px', height: '35px' }}
                  onClick={() => {
                    verifyDoctor(selectedDoctor);
                    goBackToList();
                  }}
                >
                  Approve
                </button>
                <button
                  style={{ color: 'white', backgroundColor: 'red', width: '70px', height: '35px' }}
                  onClick={() => {
                    rejectDoctor(selectedDoctor);
                    goBackToList();
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
            <button
              className="mt-4 p-2 border rounded-md bg-gray-200"
              onClick={goBackToList}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default view showing the list of unverified doctors
  return (
    <div>
      <Navbar />
      <div className="flex items-start bg-[#F8F8FF]">
        <Sidebar />
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
          <h1 className="text-lg font-medium">Unverified Doctors</h1>
          <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
            {unverifiedDoctors.map((item, index) => (
              <div
                className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
                key={index}
              >
                <img
                  className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                  src={item.image}
                  alt="doctor"
                />
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                  <p className="text-zinc-600 text-sm">{item.speciality}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <button
                      style={{ color: 'white', backgroundColor: 'blue', width: '70px', height: '35px' }}
                      onClick={() => showDoctorProfile(item)} // Show profile on button click
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnverifiedDoctor;
