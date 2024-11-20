import {Routes,Route} from 'react-router-dom'
import { AdminallAppointments } from '../pages/admin/AdminallAppointments'
import { AdminDashBoard } from '../pages/admin/AdminDashBoard'
import UnverifiedDoctor from '../pages/Admin/VerifyDoctor'
import DoctorsList from '../pages/Admin/DoctorsList'

export function AdminRoutes(){
    return <Routes> <Route path='/admin-dashboard' element={<AdminDashBoard/>}></Route>
    <Route path='/admin_all-appointments' element={<AdminallAppointments/>}></Route>
    <Route path='/admin_add-doctor' element={<UnverifiedDoctor></UnverifiedDoctor> }></Route>
    <Route path='/admin_doctor-list' element={ <DoctorsList></DoctorsList> }></Route></Routes>
}