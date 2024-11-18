import React, { useState } from 'react';
import { heal_logo, patients_icon } from '../../assets/assets_copy.js';  // Assuming you have local assets

const Navbar = () => {
  // Mock state for tokens (admin and doctor)
  const [isAdmin, setIsAdmin] = useState(true);  // Set true or false to mock admin or doctor status

  const logOut = () => {
    // Simple mock logout logic (clear admin/doctor state)
    setIsAdmin(false);
    alert("Logged out!");
  };

  return (
    <div className='flex justify-between py-3 items-center px-10 border-b bg-white'>
    <div className='flex items-center text-xs gap-2'>
      <img className='w-40 cursor-pointer' src={heal_logo} alt="Logo" />
      <div>
        <p className='text-3xl font-bold'>Heal Nexus</p> {/* Larger, bold text */}
        <p className='mt-1 border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-center'>
          Admin {/* Positioned below Heal Nexus */}
        </p>
      </div>
    </div>
      
      <div className="flex">
        <img src={patients_icon} alt="Admin" />
        <button onClick={logOut} className='bg-red-500  text-white text-sm px-10 py-2 rounded-full'>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
