import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";

Modal.setAppElement("#root");

const Appointment = () => {
  const [doctorData, setDoctorData] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/profile/get-doctor/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setDoctorData(response.data.response);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const doctorSlots = [
    { date: "21_11_2024", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
    { date: "22_11_2024", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
    { date: "23_11_2024", slots: ["10:00 AM", "1:00 PM", "5:00 PM"] },
  ];

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
    setSelectedSlot("");
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      alert("Please select a time slot before booking.");
      return;
    }
    setIsModalOpen(true);
  };

  const confirmBooking = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/appointment/book-appointment`,
        {
          doctorID: id,
          slotDate: doctorSlots[selectedDayIndex].date,
          slotTime: selectedSlot,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      alert("Error booking appointment. Please try again.");
      console.error("Error booking appointment:", error);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    window.location.href = "/my-appointments";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doctorData) {
    return <p>Doctor data not found.</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Doctor Details Section */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
        <img
          src={doctorData.image}
          alt={doctorData.userName}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          {doctorData.userName}{" "}
          <span className="text-blue-500">
            <i className="fas fa-check-circle"></i>
          </span>
        </h1>
        <p className="text-gray-600">
          {doctorData?.qualifications?.join(", ")} - {doctorData?.specialty}
        </p>

        <p className="text-gray-500 mt-2 text-center">{doctorData.biography}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">
          Appointment Fee: ${doctorData.consultationFee}
        </p>
      </div>

      {/* Slot Selection and Other Components */}
      {/* (Same as before) */}
    </div>
  );
};

export default Appointment;
