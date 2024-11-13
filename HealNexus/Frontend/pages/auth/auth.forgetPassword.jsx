import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/forget-password`, { email });
      if (response.status === 200) {
        setTimeout(() => { toast.success('Password Reset Link has been sent!') }, 1000);
      }

    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setTimeout(() => { setLoading(false) }, 1000);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-pink-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Heal Nexus</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reset your password</h2>
          <p className="text-gray-600 mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword;