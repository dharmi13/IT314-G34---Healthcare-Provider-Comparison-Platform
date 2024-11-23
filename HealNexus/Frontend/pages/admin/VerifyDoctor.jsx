import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';
import axios from 'axios';

const UnverifiedDoctor = () => {
  const [unverifiedDoctors, setUnverifiedDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get-unverified-doctors`, {
          withCredentials: true
        });
  
        if (response.status === 200) {
          console.log(response.data.doctorData);
          setUnverifiedDoctors(response.data.doctorData);
        }
      } catch (error) {
        console.error('Error in Logging out', error);
      }
    };

    fetchDoctorData();
  }, []);

  const [selectedDoctor, setSelectedDoctor] = useState(null); 

  const showDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const goBackToList = () => {
    setSelectedDoctor(null);
  };

  const verifyDoctor = async (doctor) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/approve-doctor/${doctor._id}`, null, {
        withCredentials: true
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error in Logging out', error);
    }
  };

  const rejectDoctor = () => {

  };

  if (selectedDoctor) {
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
                <p className="text-neutral-800 text-lg font-medium">{selectedDoctor.userData.userName}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.userData.email}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor. contactNumber}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.specialty}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.qualifications}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.experience}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.consultationFee}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.clinicAddress.street}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.clinicAddress.city}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.clinicAddress.state}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.clinicAddress.country}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.clinicAddress.postalCode}</p>
                <p className="text-zinc-600 text-sm">{selectedDoctor.biography}</p>
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
                  <p className="text-neutral-800 text-lg font-medium">{item.userData.userName}</p>
                  <p className="text-zinc-600 text-sm">{item.specialty}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <button
                      style={{ color: 'white', backgroundColor: 'blue', width: '70px', height: '35px' }}
                      onClick={() => showDoctorProfile(item)} 
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
