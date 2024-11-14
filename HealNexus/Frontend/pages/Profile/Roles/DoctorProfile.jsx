import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState({
    specialty: "",
    qualifications: [""],
    experience: "",
    contactNumber: "",
    consultationFee: "",
    clinicAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    biography: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      clinicAddress: {
        ...prevDetails.clinicAddress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/profile/create-doctor`,
        doctorDetails,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Doctor profile created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating doctor profile:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Doctor Profile</h2>
      <input
        name="specialty"
        value={doctorDetails.specialty}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Specialty"
      />
      <input
        name="experience"
        value={doctorDetails.experience}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Experience (years)"
      />
      <input
        name="contactNumber"
        value={doctorDetails.contactNumber}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Contact Number"
      />
      <input
        name="consultationFee"
        value={doctorDetails.consultationFee}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Consultation Fee"
      />
      <input
        name="biography"
        value={doctorDetails.biography}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Biography"
      />
      <h3 className="text-lg font-semibold mt-4">Clinic Address</h3>
      <input
        name="street"
        value={doctorDetails.clinicAddress.street}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Street"
      />
      <input
        name="city"
        value={doctorDetails.clinicAddress.city}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="City"
      />
      <input
        name="state"
        value={doctorDetails.clinicAddress.state}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="State"
      />
      <input
        name="postalCode"
        value={doctorDetails.clinicAddress.postalCode}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Postal Code"
      />
      <input
        name="country"
        value={doctorDetails.clinicAddress.country}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Country"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 w-full mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
