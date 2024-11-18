import React, { useState } from 'react';
import { heal_logo, doctor_icon } from '../../assets/assets_copy.js'; // Assuming you have local assets

const Navbar = () => {
  // Mock state for admin/doctor status
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin/doctor status
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State for profile dropdown visibility

  const logOut = () => {
    // Simple mock logout logic
    setIsAdmin(false);
    alert("Logged out!");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="flex justify-between py-3 items-center px-10 border-b bg-white">
      {/* Left: Logo Section */}
      <div className="flex items-center text-xs gap-2">
        <img className="w-40 cursor-pointer" src={heal_logo} alt="Logo" />
        <div>
          <p className="text-3xl font-bold">Heal Nexus</p>
          <p className="mt-1 border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-center">
            Doctor
          </p>
        </div>
      </div>

      {/* Right: Logout and Profile Section */}
      <div className="flex items-center relative gap-4">
        {/* Logout Button */}
        <button
          onClick={logOut}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-full"
        >
          Logout
        </button>

        {/* Profile Section */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={toggleProfileDropdown}
        >
          <img
            src={doctor_icon}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm font-medium">Dr. John Doe</p>
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 w-48">
            <ul>
              <li className="py-2 hover:bg-gray-100 cursor-pointer">
                <a href="/profile">View Profile</a>
              </li>
              <li className="py-2 hover:bg-gray-100 cursor-pointer">
                <a href="/settings">Settings</a>
              </li>
              <li
                className="py-2 text-red-500 hover:bg-red-500 cursor-pointer"
                onClick={logOut}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
