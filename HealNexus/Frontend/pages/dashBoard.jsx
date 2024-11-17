import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaSearch ,FaUserCircle} from 'react-icons/fa';


const DashBoard = () => {
  return (
    <div>
      <Appbar />
      <HeroSection/>
      <Services />
      <SpecialitySection />
      <Footer />
    </div>
  );
};

export default DashBoard;

export function Appbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll event to trigger sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Activate sticky mode after 50px scroll
      } else {
        setIsScrolled(false); // Revert to normal flow
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
        withCredentials: true
      });

      if (response.status === 200) {
        navigate('/');
      } 
    } catch (error) {
      console.error('Error in Logging out', error);
    }
  };


  return (
    <div
      className={`flex justify-between items-center px-4 py-4 bg-white border-b border-gray-400 mx-2 transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 w-full shadow-lg z-50" : ""
        }`}
      style={{ height: "80px" }}
    >
      {/* Logo and Text */}
      <div className="flex items-center justify-between">
        <img src="/assets/heal_logo.png" alt="Logo" className="w-25 h-20" />

        {/* Center the text on small screens */}
        <div className="text-2xl font-bold text-gray-800 sm:text-left text-center w-full sm:w-auto">
          HealNexus
        </div>
      </div>

      {/* Navigation Links (only visible on medium and up) */}
      <div className="hidden lg:flex space-x-8 text-gray-800 font-semibold">
        <Link to="/dashboard" className="hover:text-blue-600 hover:border-b-2 border-blue-600">DASHBOARD</Link>
        <Link to="/doctors" className="hover:text-blue-600 hover:border-b-2 border-blue-600">ALL DOCTORS</Link>
        <Link to="/about" className="hover:text-blue-600 hover:border-b-2 border-blue-600">ABOUT</Link>
        <Link to="/contact" className="hover:text-blue-600 hover:border-b-2 border-blue-600">CONTACT</Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transform transition-all duration-300 ${isScrolled ? "translate-y-[-5px] scale-105" : ""
            } hover:translate-y-[-5px] hover:scale-105`}
        >
          Logout
        </button>

        {/* Profile Icon */}
        <button
          className={`p-2 text-blue-600 hover:text-blue-700 transform transition-all duration-300 ${isScrolled ? "translate-y-[-5px] scale-105" : ""
            } hover:translate-y-[-5px] hover:scale-105`}
        >
          <FaUserCircle className="w-8 h-8" /> {/* User icon */}
        </button>
      </div>
    </div>
  );
}


export function HeroSection() {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto text-center">

        {/* Location and Search Inputs */}
        <div className="flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden w-2/3 md:w-1/2 mx-auto">
          {/* Location Input */}
          <div className="flex items-center px-4 py-2 bg-white border-r border-gray-300">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Location"
              className="outline-none"
              style={{ minWidth: "60px" }}
            />
          </div>

          {/* Search Input */}
          <div className="flex items-center px-4 py-2 w-full">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals, etc."
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Service Options */}
        <div className="bg-blue-500 mx-8 rounded-lg mt-6">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">

            <h2 className="text-3xl text-left font-semibold text-white">Welcome to Heal Nexus</h2>
            <img
              src="assets/doc13.png" // Replace with your image path
              alt="Doctor pointing"
              className="max-w-full h-auto self-end"
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const services = [
    { name: 'Period doubts or Pregnancy', action: 'CONSULT NOW', image: '/assets/irregular-painful+period.webp' },
    { name: 'Acne, pimple or skin issues', action: 'CONSULT NOW', image: '/assets/Acne.webp' },
    { name: 'Cold, cough or fever', action: 'CONSULT NOW', image: '/assets/coughing.webp' },
    { name: 'Depression or anxiety', action: 'CONSULT NOW', image: '/assets/12-mental-wellness.webp' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Consult top doctors online for all types of health problems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 justify-around">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
            >
              <div className="hidden sm:block md:block mb-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-32 h-32 object-cover mb-4"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hidden sm:block md:block">
                {service.name}
              </h3>
              <button className="mt-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 px-6 py-2 border-2 border-blue-600 rounded-full">
                {service.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export function SpecialitySection() {
  const specialities = [
    { name: "General physician", icon: "/assets/general_physician.svg" },
    { name: "Gynecologist", icon: "/assets/gynecologist.svg" },
    { name: "Dermatologist", icon: "/assets/dermatologist.svg" },
    { name: "Pediatricians", icon: "/assets/pediatricians.svg" },
    { name: "Neurologist", icon: "/assets/neurologist.svg" },
    { name: "Gastroenterologist", icon: "/assets/gastroenterologist.svg" },
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 text-center mx-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Book an appointment for an in-clinic consultation</h2>
      <p className="text-gray-600 mb-12">
        Find experienced doctors across all specialties
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {specialities.map((speciality, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center transition-transform transform hover:scale-110 hover:translate-y-2 shadow-md">
              <img src={speciality.icon} alt={speciality.name} className="w-12 h-12" />
            </div>
            <p className="text-gray-700 font-medium">{speciality.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
const Footer = () => {
  return (
    <footer className="bg-white mx-2 mt-4 pt-4 border-">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 md:text-center flex flex-col items-center">
          <div className="flex items-center mb-4">
            <img src="assets/heal_logo.png" alt="Logo" className="h-25 w-20 mr-2" />
            <h1 className="text-2xl font-bold">HealNexus</h1>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6 md:mb-0 md:text-center flex flex-col items-center">
          <h2 className="font-bold mb-2">COMPANY</h2>
          <ul className="text-gray-600">
            <li className="mb-1">
              <a href="#about" className="hover:text-blue-500">About us</a>
            </li>
            <li className="mb-1">
              <a href="#team" className="hover:text-blue-500">Team</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t pt-4 text-gray-600">
        © 2024 @ Group_34 @ Made with{' '}
        <img
          src="assets/Love_Heart_SVG.svg"
          alt="icon"
          className="inline-block w-4 h-4 align-middle"
        />{' '}
        - All Rights Reserved.
      </div>
    </footer>
  );
};