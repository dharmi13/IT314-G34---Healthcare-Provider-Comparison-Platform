import React, { useState } from 'react';
import Navbar from '../../components/admin/Navbar.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';

const DoctorsList = () => {
  // Define the doctors state using useState
  const [doctors, setDoctors] = useState([
    { name: "Dr. John Smith", image: "src/assets/doctor.jpg", speciality: "Cardiologist" },
    { name: "Dr. Sarah Johnson", image: "src/assets/doctor.jpg", speciality: "Dermatologist" },
    { name: "Dr. Michael Brown", image: "src/assets/doctor.jpg", speciality: "Neurologist" },
    { name: "Dr. Emily Davis", image: "src/assets/doctor.jpg", speciality: "Pediatrician" },
    { name: "Dr. William Garcia", image: "src/assets/doctor.jpg", speciality: "Orthopedic Surgeon" },
  ]);

  return (
    <div>
      <Navbar />
      <div className='flex items-start bg-[#F8F8FF]'>
        <Sidebar />
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
          <h1 className='text-lg font-medium'>All Doctors</h1>
          <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
            {doctors.map((item, index) => (
              <div 
                className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' 
                key={index}
              >
                <img 
                  className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" 
                  src={item.image} 
                  alt={`Image of ${item.name}`} 
                />
                <div className='p-4'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
