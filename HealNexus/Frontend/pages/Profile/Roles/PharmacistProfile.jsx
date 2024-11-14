import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PharmacistProfile() {
  const navigate = useNavigate();
  const [pharmacistDetails, setPharmacistDetails] = useState({
    certification: "",
    pharmacyName: "",
    pharmacyLocation: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    contactNumber: "",
    yearsOfExperience: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacistDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const field = name.split(".")[1]; 
    setPharmacistDetails((prevDetails) => ({
      ...prevDetails,
      pharmacyLocation: {
        ...prevDetails.pharmacyLocation,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/profile/create-pharmacist`,
        pharmacistDetails,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Pharmacist profile created successfully");
        navigate('/login');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-teal-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pharmacist Profile</h2>
      <input
        name="certification"
        value={pharmacistDetails.certification}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Certification"
      />
      <input
        name="pharmacyName"
        value={pharmacistDetails.pharmacyName}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Pharmacy Name"
      />
      <input
        name="yearsOfExperience"
        type="number"
        value={pharmacistDetails.yearsOfExperience}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Years of Experience"
      />
      <input
        name="contactNumber"
        value={pharmacistDetails.contactNumber}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Contact Number"
      />

      <h3 className="text-lg font-semibold mt-4">Address</h3>
      <input
        name="street"
        value={pharmacistDetails.pharmacyLocation.street}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Street"
      />
      <input
        name="city"
        value={pharmacistDetails.pharmacyLocation.city}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="City"
      />
      <input
        name="state"
        value={pharmacistDetails.pharmacyLocation.state}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="State"
      />
      <input
        name="postalCode"
        value={pharmacistDetails.pharmacyLocation.postalCode}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Postal Code"
      />
      <input
        name="country"
        value={pharmacistDetails.pharmacyLocation.country}
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
