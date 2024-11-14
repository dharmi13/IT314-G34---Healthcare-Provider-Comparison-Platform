import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function PatientProfile() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    age: "",
    gender: "",
    contactNumber: "",
    emergencyContact: {
      name: "",
      relationship: "",
      contactNumber: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [parent]: {
          ...prevDetails[parent],
          [child]: value,
        },
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/profile/create-patient`,
        userDetails,
        { withCredentials: true }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error_) {
      console.error("Error logging in:", error_.response?.data || error_.message);
      const error = error_.response?.data?.error || "An error occurred. Please try again.";
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Profile</h2>
      <input
        name="age"
        value={userDetails.age}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Age"
      />
      <input
        name="gender"
        value={userDetails.gender}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Gender"
      />
      <input
        name="contactNumber"
        value={userDetails.contactNumber}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Contact Number"
      />
      <input
        name="emergencyContact.name"
        value={userDetails.emergencyContact.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Emergency ContactName"
      />
      <input
        name="emergencyContact.relationship"
        value={userDetails.emergencyContact.relationship}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Relationship"
      />
      <input
        name="emergencyContact.contactNumber"
        value={userDetails.emergencyContact.contactNumber}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Emergency ContactNumber"
      />
      <input
        name="address.street"
        value={userDetails.address.street}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Street Address"
      />
      <input
        name="address.city"
        value={userDetails.address.city}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="City"
      />
      <input
        name="address.state"
        value={userDetails.address.state}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="State"
      />
      <input
        name="address.postalCode"
        value={userDetails.address.postalCode}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Postal Code"
      />
      <input
        name="address.country"
        value={userDetails.address.country}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Country"
      />
      <input
        name="medicalHistory"
        value={userDetails.medicalHistory}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Medical History"
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
