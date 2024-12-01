import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LabTechnicianProfile() {
  const navigate = useNavigate();
  const [labTechnicianDetails, setLabTechnicianDetails] = useState({
    qualifications: "",
    associatedLab: "",
    specialization: "",
    yearsOfExperience: "",
    certifications: "",
    contactNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabTechnicianDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setLabTechnicianDetails((prevDetails) => ({
      ...prevDetails,
      address: {
        ...prevDetails.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/profile/create-lab-technician`,
        labTechnicianDetails,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Lab Technician profile created successfully");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error creating Lab Technician profile:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Lab Technician Profile</h2>
      <input
        name="qualifications"
        value={labTechnicianDetails.qualifications}
        onChange={(e) => setLabTechnicianDetails({ ...labTechnicianDetails, qualifications: e.target.value.split(", ") })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Qualifications (comma-separated)"
      />
      <input
        name="associatedLab"
        value={labTechnicianDetails.associatedLab}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Associated Lab"
      />
      <input
        name="specialization"
        value={labTechnicianDetails.specialization}
        onChange={(e) => setLabTechnicianDetails({ ...labTechnicianDetails, specialization: e.target.value.split(", ") })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Specialization (comma-separated)"
      />
      <input
        name="yearsOfExperience"
        type="number"
        value={labTechnicianDetails.yearsOfExperience}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Years of Experience"
      />
      <input
        name="certifications"
        value={labTechnicianDetails.certifications}
        onChange={(e) => setLabTechnicianDetails({ ...labTechnicianDetails, certifications: e.target.value.split(", ") })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Certifications (comma-separated)"
      />
      <input
        name="contactNumber"
        value={labTechnicianDetails.contactNumber}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Contact Number"
      />
      <h3 className="text-lg font-semibold mt-4">Address</h3>
      <input
        name="street"
        value={labTechnicianDetails.address.street}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Street"
      />
      <input
        name="city"
        value={labTechnicianDetails.address.city}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="City"
      />
      <input
        name="state"
        value={labTechnicianDetails.address.state}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="State"
      />
      <input
        name="postalCode"
        value={labTechnicianDetails.address.postalCode}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Postal Code"
      />
      <input
        name="country"
        value={labTechnicianDetails.address.country}
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
