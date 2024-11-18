

import React, { useEffect, useState } from 'react';
import { people_icon, doctor_icon } from '../../assets/assets_copy.js';  // Assuming you have local assets
import Navbar from '../../components/admin/Navbar.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';

export const AdminallAppointments = () => {
  // Mocked static data for appointments
  const [appointments, setAppointments] = useState([
    {
      userData: { name: "John Doe", dob: "1990-06-15", image: "src/assets/user.png" },
      docData: { name: "Dr. Sarah Lee", fee: 50, image: "src/assets/doctor.jpg" },
      slotDate: "15_11_2024",
      slotTime: "10:00 AM"
    },
    {
      userData: { name: "Jane Smith", dob: "1985-09-25", image: "src/assets/user.png" },
      docData: { name: "Dr. Michael Green", fee: 70, image: "src/assets/doctor.jpg" },
      slotDate: "16_11_2024",
      slotTime: "2:00 PM"
    },
    {
      userData: { name: "Robert Johnson", dob: "1993-02-12", image: "src/assets/user.png" },
      docData: { name: "Dr. Emily Brown", fee: 60, image: "src/assets/doctor.jpg" },
      slotDate: "17_11_2024",
      slotTime: "11:00 AM"
    }
  ]);

  // Function to format the date
  function formatDate(dateString) {
    const [day, month, year] = dateString.split("_");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  }

  // Function to calculate age based on date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className='flex items-start bg-[#F8F8FF]'>
     <Sidebar></Sidebar>
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
        </div>

        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
              key={index}
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                {item.userData && (
                  <>
                    <img className='w-8 rounded-full' src={item.userData.image || people_icon} alt="User" />
                    <p className='text-ellipsis overflow-hidden max-w-[150px]'>{item.userData.name}</p>
                  </>
                )}
              </div>
              <p>{item.userData ? calculateAge(item.userData.dob) : "N/A"}</p>
              <p>{formatDate(item.slotDate)} | {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                {item.docData && (
                  <>
                    <img className='w-8 rounded-full' src={item.docData.image || doctor_icon} alt="Doctor" />
                    <p className='text-ellipsis overflow-hidden max-w-[150px]'>{item.docData.name}</p>
                  </>
                )}
              </div>
              <p>{item.docData ? `$${item.docData.fee}` : "N/A"}</p>
            </div>
          ))
        ) : (
          <p className="text-center py-4">No appointments available.</p>
        )}
      </div>
    </div>
    </div>
     </div>
  );
}



