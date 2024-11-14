import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    permissions: ["manageUsers", "viewReports"],
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
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
        `${import.meta.env.VITE_SERVER_URL}/profile/create-admin`,
        adminDetails,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Admin profile created successfully");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error creating admin profile:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      <input
        name="permissions"
        value={adminDetails.permissions.join(", ")}
        onChange={(e) => setAdminDetails({ ...adminDetails, permissions: e.target.value.split(", ") })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Permissions (comma-separated)"
      />
      <h3 className="text-lg font-semibold mt-4">Address</h3>
      <input
        name="street"
        value={adminDetails.address.street}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Street"
      />
      <input
        name="city"
        value={adminDetails.address.city}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="City"
      />
      <input
        name="state"
        value={adminDetails.address.state}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="State"
      />
      <input
        name="postalCode"
        value={adminDetails.address.postalCode}
        onChange={handleAddressChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        placeholder="Postal Code"
      />
      <input
        name="country"
        value={adminDetails.address.country}
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
