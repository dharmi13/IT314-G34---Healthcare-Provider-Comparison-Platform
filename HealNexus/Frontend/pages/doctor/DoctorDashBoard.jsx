import React, { useState } from 'react';
import { doctor_icon, appointments_icon, patients_icon, list_icon } from '../../assets/assets_copy.js';  // Assuming you have local assets
import Navbar from '../../components/doctor/Navbar.jsx';
import Sidebar from '../../components/doctor/Sidebar.jsx';

export const DoctorDashBoard = () => {
  // Mock dashboard data
  const [dashData, setDashData] = useState({
    doctors: 25,
    appointments: 100,
    users: 300,
    latestappointments: [
      {
        docData: {
          name: "Dr. Sarah Lee",
          image: "src/assets/doctor.jpg"
        },
        slotDate: "18_11_2024"
      },
      {
        docData: {
          name: "Dr. Michael Green",
          image: "src/assets/doctor.jpg"
        },
        slotDate: "17_11_2024"
      },
      {
        docData: {
          name: "Dr. Emily Brown",
          image: "src/assets/doctor.jpg"
        },
        slotDate: "16_11_2024"
      },
      {
        docData: {
          name: "Dr. Emily White",
          image: "src/assets/doctor.jpg"
        },
        slotDate: "10_11_2024"
      },
      {
        docData: {
          name: "Dr. Jay Brown",
          image: "src/assets/doctor.jpg"
        },
        slotDate: "19_11_2024"
      },
    ]
  });

  // Function to format the date
  function formatDate(dateString) {
    const [day, month, year] = dateString.split("_");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  }

  return (
    <>
      <Navbar />
      <div className='flex items-start bg-[#F8F8FF]'>
        <Sidebar />
        {dashData && (
          <div className='m-5'>
            <div className='flex flex-wrap gap-6'>
              
              {/* Doctor Metrics */}
              <div className='flex items-center gap-4 bg-white p-6 min-w-72 rounded-lg border-2 border-fary-100 cursor-pointer hover:scale-105 transition-all'>
                <div className='w-16'>
                  <img src={doctor_icon} alt="Doctor Icon" />
                </div>
                <div>
                  <p className='text-2xl font-semibold text-gray-600'>{dashData.doctors}</p>
                  <p className='text-gray-400'>Total Earnings</p>
                </div>
              </div>

              {/* Appointments Metrics */}
              <div className='flex items-center gap-4 bg-white p-6 min-w-72 rounded-lg border-2 border-fary-100 cursor-pointer hover:scale-105 transition-all'>
                <div className='w-16'>
                  <img src={appointments_icon} alt="Appointments Icon" />
                </div>
                <div>
                  <p className='text-2xl font-semibold text-gray-600'>{dashData.appointments}</p>
                  <p className='text-gray-400'>Appointments</p>
                </div>
              </div>

              {/* Users (Patients) Metrics */}
              <div className='flex items-center gap-4 bg-white p-6 min-w-72 rounded-lg border-2 border-fary-100 cursor-pointer hover:scale-105 transition-all'>
                <div className='w-16'>
                  <img src={patients_icon} alt="Patients Icon" />
                </div>
                <div>
                  <p className='text-2xl font-semibold text-gray-600'>{dashData.users}</p>
                  <p className='text-gray-400'>Patients</p>
                </div>
              </div>
            </div>

            {/* Latest Bookings Section */}
            <div className='bg-white mt-10'>
              <div className='flex items-center gap-3 px-6 py-5 rounded-t-lg border'>
                <img src={list_icon} alt="List Icon" />
                <p className='font-semibold text-xl'>Top Appointments</p>
              </div>

              <div className='pt-4 border border-t-0'>
                {dashData.latestappointments.map((item, index) => (
                  <div className='flex items-center px-8 py-4 gap-4 hover:bg-gray-100' key={index}>
                    <img className='w-28 rounded-full' src={item.docData.image} alt="Doctor" />
                    <div className='flex-1 text-base'>
                      <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                      <p className='text-gray-600'>{formatDate(item.slotDate)}</p>
                    </div>
                    <div className='text-green-400 text-lg'>pending</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


