import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios"; // Import axios for HTTP requests

// Configure React Modal
Modal.setAppElement("#root");

const Appointment = () => {
  // Dummy data for doctor information
  const docInfo = {
    id: "1",
    name: "Dr. John Doe",
    image: "https://via.placeholder.com/150", // Placeholder image
    degree: "MBBS",
    speciality: "General Physician",
    experience: "5 years",
    about:
      "Dr. John Doe is dedicated to providing high-quality healthcare with a focus on preventive care and wellness.",
    fee: 50,
  };

  // Dummy data for slots
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const doctorSlots = [
    { day: "2024_11_21", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "2024_11_22", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
    { day: "2024_11_23", slots: ["10:00 AM", "1:00 PM", "5:00 PM"] },
  ];

  // State variables
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Event Handlers
  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
    setSelectedSlot(""); // Clear the selected slot when switching days
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      alert("Please select a time slot before booking.");
      return;
    }
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmBooking = () => {
    // Send the appointment data to the backend here
    axios
      .post("/api/book-appointment", {
        doctorId: docInfo.id,
        selectedDay: doctorSlots[selectedDayIndex].day,
        selectedSlot: selectedSlot,
        patientName: "Patient Name", // You can collect patient data from a form if needed
        patientContact: "Patient Contact Info",
      })
      .then((response) => {
        setIsModalOpen(false); // Close the confirmation modal
        setIsSuccessModalOpen(true); // Open the success modal
      })
      .catch((error) => {
        alert("Error booking appointment. Please try again.");
        console.error("Error booking appointment:", error);
      });
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Redirect to 'My Appointments' (Mock navigation)
    window.location.href = "/my-appointments";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Doctor Details Section */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          {docInfo.name}{" "}
          <span className="text-blue-500">
            <i className="fas fa-check-circle"></i>
          </span>
        </h1>
        <p className="text-gray-600">
          {docInfo.degree} - {docInfo.speciality}
        </p>
        <p className="text-gray-500 mt-2 text-center">{docInfo.about}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">
          Appointment Fee: ${docInfo.fee}
        </p>
      </div>

      {/* Slot Selection Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Select a Day
        </h3>
        {/* Day Buttons */}
        <div className="flex justify-center mb-6">
          {doctorSlots.map((day, index) => {
            const dayDate = day.day.replace(/_/g, "-"); // Corrected format
            const [year, month, date] = dayDate.split("-");
            const formattedDate = `${year}-${month}-${date}`; // Reformat for JS Date
            const dayName = daysOfWeek[new Date(formattedDate).getDay()]; // Get day name

            return (
              <button
                key={index}
                onClick={() => handleDayClick(index)}
                className={`text-center w-24 h-16 rounded-md font-bold mx-2 flex flex-col items-center justify-center ${
                  selectedDayIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span className="text-base font-semibold">{dayName}</span>
                <span className="text-xs mt-1">{dayDate}</span>
              </button>
            );
          })}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Select a Time Slot
        </h3>
        {/* Time Slot Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {doctorSlots[selectedDayIndex].slots.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => handleSlotClick(slot)}
              className={`p-2 border rounded-md text-center ${
                selectedSlot === slot
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleBookAppointment}
          className="px-8 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Book Appointment
        </button>
      </div>

      {/* Modal for Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Booking</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to book an appointment with <b>{docInfo.name}</b>{" "}
          on{" "}
          <b>
            {doctorSlots[selectedDayIndex].day.replace(/_/g, "/")} at{" "}
            {selectedSlot}
          </b>
          ?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={confirmBooking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Modal for Success Alert */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-gray-700 mb-6">
          Appointment successfully booked with <b>{docInfo.name}</b> on{" "}
          <b>
            {doctorSlots[selectedDayIndex].day.replace(/_/g, "/")} at{" "}
            {selectedSlot}
          </b>
          .
        </p>
        <div className="flex justify-center">
          <button
            onClick={closeSuccessModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Appointment;
