import React, { useContext } from 'react'
import { AdminContext } from '../../pages/doctor/context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets.js'
import { DoctorContext } from '../../pages/doctor/context/DoctorContext.jsx'

const Sidebar = () => {

  return (
    <div className='min-h-screen bg-white border-r'>
       {
            <ul className='text-[#515151] mt-5 '>
              <NavLink to={'/ad_dash'}  className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} >
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>
            </ul>
       }
    </div>
  )
}

export default Sidebar
 