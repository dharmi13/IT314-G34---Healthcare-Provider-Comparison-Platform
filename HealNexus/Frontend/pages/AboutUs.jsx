import React from "react";
import "./AboutUs.css";
import healLogo from '../assets/heal_logo.png';


const AboutUs = () => {
  const goBackToHome = () => {
    window.location.href = "/"; // Navigate to the home page
  };

  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <img src={healLogo} alt="Heal Nexus Logo" className="logo" />
        <h1>About Heal Nexus</h1>
      </div>

      <div className="about-us-content">
        {/* Section 1: About Us */}
        <div className="section">
         
          <p className="about-us-text">
            The Healthcare Provider Comparison Platform is designed to help patients efficiently compare and choose healthcare providers, manage appointments, and interact with various medical services. It offers a user-friendly interface and functionalities for patients, doctors, hospitals, and administrators. This platform streamlines processes such as appointment booking, specialist search, medicine orders, report generation, and payment processing.
          </p>
        </div>

        {/* Section 2: Key Features */}
        <div className="section">
          <h2>Key Features of Heal Nexus</h2>
          <ul className="key-features-list">
            <li><strong>Login & Registration:</strong> Patients can securely create accounts, log in, and manage their profiles.</li>
            <li><strong>Search Specialists:</strong> Patients can search and filter doctors by specialty, location, and ratings.</li>
            <li><strong>Book Appointments:</strong> Users can view doctor profiles and available slots to book and cancel appointments.</li>
            <li><strong>Provide Reviews:</strong> After appointments, patients can rate and review specialists.</li>
            <li><strong>Order Medicine:</strong> Patients can order prescribed medicines online for home delivery.</li>
            <li><strong>Manage Appointments:</strong> Doctors can view, update, and cancel patient appointments.</li>
            <li><strong>Prescription Management:</strong> Doctors can create and manage prescriptions, which are accessible to patients and pharmacies.</li>
            <li><strong>Manage Users & Specialists:</strong> Admins can manage user roles, specialist profiles, and update details in real-time.</li>
            <li><strong>Emergency Services:</strong> Hospitals can efficiently manage and dispatch emergency services.</li>
            <li><strong>Report Generation:</strong> Pathologists can generate and upload reports that are shared with doctors and patients.</li>
            <li><strong>Payment System:</strong> Secure payment processing for services and medicines is integrated.</li>
          </ul>
        </div>
      </div>

      {/* Go Back to Home Page Button */}
      <button className="go-back-button" onClick={goBackToHome}>
        Go Back to Home Page
      </button>
    </div>
  );
};

export default AboutUs;
