import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import React from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl =import.meta.env.VITE_BACKEND_URL;
    const[dtoken,setDtoken]=useState(localStorage.getItem('dtoken') || '');
    const[appointments,setAppointments]=useState('');
    const[dashdata,setdashdata]=useState(false);
    const[profiledata,setprofiledata]=useState(false);


    const getAppointments = async ()=>{
        try {
            const {data}=await axios.get('http://localhost:4000/api/doctor/appointments',{headers:{dtoken}})
            if(data.success)
            {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const completeAppointment = async (appointmentId)=>{
        try {
            const {data} = await axios.post('http://localhost:4000/api/doctor/complete-appointment',{appointmentId},{headers:{dtoken}})

            if(data.success)
            {
                toast.success(data.message);
                getAppointments();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async()=>{
        try {
            const {data} =await axios.get('http://localhost:4000/api/doctor/dashboard',{headers:{dtoken}})

            if(data.success)
            {
                setdashdata(data.docdashdata);
                console.log(data.docdashdata);
            }else{
                toast(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfiledata = async () => {
        try {
            const {data}=await axios.get('http://localhost:4000/api/doctor/doc-profile',{headers:{dtoken}})
            if(data.success)
            {
                setprofiledata(data.profiledata)
                console.log(data.profiledata);
            }
        } catch (error) {
            
        }
    }
    const value = {
        dtoken,setDtoken,backendUrl,getAppointments,appointments,setAppointments,completeAppointment,
        dashdata,setdashdata,getDashData,
        profiledata,setprofiledata,getProfiledata
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
