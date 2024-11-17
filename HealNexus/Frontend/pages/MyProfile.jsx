import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; // Assuming assets.js is correctly set up
import { Appbar } from './dashBoard';

const MyProfile = () => {
    const [userdata, setuserdata] = useState(null);
    const [isEdit, setIsedit] = useState(false);
    const [image, setImage] = useState(null);
    const [token, setToken] = useState(true); // Token is now true

    // Sample dummy data (replace with actual API data)
    const dummyUserData = {
        name: "John Doe",
        age: 34,
        gender: "Male",
        contactNumber: "123-456-7890",
        emergencyContact: {
            name: "Jane Doe",
            relationship: "Spouse",
            contactNumber: "987-654-3210"
        },
        address: {
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            postalCode: "62704",
            country: "USA"
        },
        medicalHistory: ["Allergy to peanuts", "Asthma"],
        image: assets.user_placeholder
    };

    // Set userdata to dummy data instead of fetching from backend
    useEffect(() => {
        if (token) {
            setuserdata(dummyUserData);
        } else {
            setuserdata(null);
        }
    }, [token]);

    // Function to update the profile data
    const updateUserProfileData = () => {
        // Log updated userdata to console (replace with actual API call logic)
        console.log('Updated User Data:', userdata);
        toast.success("Profile updated successfully!");
        setIsedit(false); // Switch to view mode after saving
        setImage(null); // Clear image selection
    };

    const address = userdata?.address || {};
    const emergencyContact = userdata?.emergencyContact || {};
    const medicalHistory = userdata?.medicalHistory || [];

    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-4">
                {/* Square-shaped container */}
                <div className="w-full sm:w-[400px] lg:w-[500px] xl:w-[600px] p-4 bg-white shadow-md rounded-lg text-sm text-gray-800 space-y-4 aspect-square flex flex-col">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                className="w-32 h-32 rounded-full border bg-gray-200"
                                src={image ? URL.createObjectURL(image) : userdata?.image}
                                alt="Profile"
                            />
                            {isEdit && (
                                <button
                                    className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm font-medium px-2 py-1 rounded-full shadow-md hover:bg-blue-600"
                                    onClick={() => document.getElementById('image').click()}
                                >
                                    Edit
                                </button>
                            )}
                            {isEdit && (
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    hidden
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            {isEdit ? (
                                <input
                                    type="text"
                                    value={userdata?.name}
                                    onChange={(e) => setuserdata((prev) => ({ ...prev, name: e.target.value }))}
                                    className="bg-gray-100 w-full p-2 rounded"
                                />
                            ) : (
                                <h2 className="text-xl font-semibold">{userdata?.name}</h2>
                            )}
                            <p className="text-gray-500">Age: {userdata?.age}</p>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    <div>
                        <h3 className="text-gray-700 font-semibold">Contact Information</h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                                <span>Email:</span>
                                <span className="text-blue-500">{userdata?.email || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phone:</span>
                                {isEdit ? (
                                    <input
                                        type="text"
                                        value={userdata?.contactNumber}
                                        onChange={(e) => setuserdata((prev) => ({ ...prev, contactNumber: e.target.value }))}
                                        className="bg-gray-100 w-2/3 p-1 rounded"
                                    />
                                ) : (
                                    <span className="text-blue-400">{userdata?.contactNumber}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    <div>
                        <h3 className="text-gray-700 font-semibold">Address</h3>
                        <div className="mt-2 space-y-1">
                            {Object.keys(address).map((key) => (
                                <div key={key} className="flex justify-between">
                                    <span className="capitalize">{key}:</span>
                                    {isEdit ? (
                                        <input
                                            type="text"
                                            value={address[key]}
                                            onChange={(e) =>
                                                setuserdata((prev) => ({
                                                    ...prev,
                                                    address: { ...prev.address, [key]: e.target.value },
                                                }))
                                            }
                                            className="bg-gray-100 w-2/3 p-1 rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-500">{address[key]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    <div>
                        <h3 className="text-gray-700 font-semibold">Emergency Contact</h3>
                        <div className="mt-2 space-y-1">
                            {Object.keys(emergencyContact).map((key) => (
                                <div key={key} className="flex justify-between">
                                    <span className="capitalize">{key}:</span>
                                    {isEdit ? (
                                        <input
                                            type="text"
                                            value={emergencyContact[key]}
                                            onChange={(e) =>
                                                setuserdata((prev) => ({
                                                    ...prev,
                                                    emergencyContact: { ...prev.emergencyContact, [key]: e.target.value },
                                                }))
                                            }
                                            className="bg-gray-100 w-2/3 p-1 rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-500">{emergencyContact[key]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    <div>
                        <h3 className="text-gray-700 font-semibold">Medical History</h3>
                        {isEdit ? (
                            <textarea
                                value={medicalHistory.join('\n')}
                                onChange={(e) =>
                                    setuserdata((prev) => ({
                                        ...prev,
                                        medicalHistory: e.target.value.split('\n'),
                                    }))
                                }
                                className="bg-gray-100 w-full p-2 rounded h-24"
                            />
                        ) : (
                            <ul className="list-disc pl-5">
                                {medicalHistory.length ? (
                                    medicalHistory.map((item, index) => (
                                        <li key={index} className="text-gray-500">
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No medical history provided</li>
                                )}
                            </ul>
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                        {isEdit ? (
                            <button
                                onClick={() => setIsedit(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsedit(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit Profile
                            </button>
                        )}

                        {isEdit && (
                            <button
                                onClick={updateUserProfileData} // Calling the function here
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
