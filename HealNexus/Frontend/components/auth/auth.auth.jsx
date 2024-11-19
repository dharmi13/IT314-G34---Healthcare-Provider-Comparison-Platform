import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpSchema } from "./AuthSchema.js";
import {z} from 'zod';

export function Auth({ type }) {
  const [userDetails, setUserDetails] = useState({ userName: "", email: "", password: "", confirmPassword: "", role: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        email: userDetails.email,
        password: userDetails.password,
      }, { withCredentials: true });

      if(response.status === 200 && response.data.role == 'Admin') {
        toast.success("Welcome Admin");
        navigate('/admin-dashboard');
      }
      else if (response.status === 200 && response.data.role == 'Doctor') {
        toast.success("Welcome Doctor");
        navigate('/doctor-dashboard');
      }
      else if(response.status === 200 && response.data.role == 'Patient') {
        toast.success("Login successful");
        navigate('/dashboard');
      }
      else if(response.status === 200 && response.data.role == 'Pharmacist') {
        toast.success("Login successful");
        navigate('/pharmacist-dashboard');
      }
      else {
        toast.success("Login successful");
        navigate('/lab-technician-dashboard');
      }
    } catch (error) {
  
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => toast.error(err.message));
      } else {
        console.error('Error logging in:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Validate user details with Zod
      signUpSchema.parse(userDetails);

      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, userDetails, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Sign up successful! Please verify your email.");
        navigate('/verify-email');
      }
    } catch (error) {
      // Handle validation errors from Zod
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => toast.error(err.message));
      } else {
        console.error('Error during sign up:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold">{type === 'login' ? 'Login' : 'Create an Account'}</h2>
        <p className="text-slate-400">
          {type === 'login' ? (
            <>
              Don't have an account?
              <Link className="pl-2 underline text-blue-500" to="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              Already have an account?
              <Link className="pl-2 underline text-blue-500" to="/login">Login</Link>
            </>
          )}
        </p>
      </div>
      <div className="w-80 flex flex-col space-y-4">
        {type === 'signup' ? <RegisterAs onRoleChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })} /> : null}

        {type === 'signup' ? <Inputbox
          placeholder="Enter your username"
          title="UserName"
          type="text"
          value={userDetails.userName}
          onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
        /> : undefined
        }

        <Inputbox
          placeholder="Enter your email"
          title="Email"
          type="text"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />

        <Inputbox
          placeholder="......."
          title="Password"
          type="password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        />

        {type === 'signup' ? (
          <Inputbox
            placeholder="......."
            title="Re-Enter Password"
            type="password"
            value={userDetails.confirmPassword}
            onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
          />
        ) : null}

        <p className="text-slate-400">
          {type === 'login' ? (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  onClick={() => { navigate('/forget-password') }}
                  className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          ) : undefined
          }
        </p>

        <button
          className="bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
          onClick={type === "signup" ? handleSignUp : handleLogin}
        >
          {loading ? 'Loading...' : (type === 'login' ? 'Login' : 'Sign Up')}
        </button>
      </div>
    </div>
  );
}

function Inputbox({ placeholder, title, type, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

function RegisterAs({ onRoleChange }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
      <p className="font-semibold text-gray-700 mb-2">Register as:</p>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="radio" name="role" value="Admin" className="mr-2" onChange={onRoleChange} />
          Admin
        </label>
        <label className="flex items-center">
          <input type="radio" name="role" value="Patient" className="mr-2" onChange={onRoleChange} />
          Patient
        </label>
        <label className="flex items-center">
          <input type="radio" name="role" value="Doctor" className="mr-2" onChange={onRoleChange} />
          Doctor
        </label>
        <label className="flex items-center">
          <input type="radio" name="role" value="Pharmacist" className="mr-2" onChange={onRoleChange} />
          Pharmacist
        </label>
        <label className="flex items-center">
          <input type="radio" name="role" value="Lab Technician" className="mr-2" onChange={onRoleChange} />
          Lab Technician
        </label>
      </div>
    </div>
  );
}
