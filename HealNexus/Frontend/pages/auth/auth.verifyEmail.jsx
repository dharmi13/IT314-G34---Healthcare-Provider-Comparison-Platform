import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ReceivedCode = otp.join("");

    setLoading(true);  
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email`, { ReceivedCode }, {
          withCredentials: true
        });
        if(response.status === 200) {
          toast.success("Email verified successfully");
          setTimeout(() => {navigate('/login')}, 1000);
        }

    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
        toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && element.previousSibling) {
      element.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6); 

    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("").concat(new Array(6 - pasteData.length).fill(""));
      setOtp(newOtp);

      const nextInputIndex = pasteData.length < 6 ? pasteData.length : 5;
      const nextInput = document.getElementById(`otp-${nextInputIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-purple-700 mb-4">Heal Nexus</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Please check your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a code to <strong>mail</strong>
        </p>

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              id={`otp-${index}`}
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => e.key === "Backspace" && handleBackspace(e.target, index)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              className="w-12 h-12 border rounded-lg text-center text-lg focus:border-purple-500 focus:outline-none"
            />
          ))}
        </div>

        <button
          type="button"
          className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 focus:outline-none"
          onClick={handleSubmit}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-gray-600 mt-4">
          Didn't receive an email? <span className="text-purple-600 cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;