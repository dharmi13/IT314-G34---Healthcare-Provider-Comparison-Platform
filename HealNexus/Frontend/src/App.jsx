import { Toaster } from 'react-hot-toast';
import AuthRoutes from '../routes/auth.routes.jsx';
import { ProfileRoute } from '../routes/profile.routes.jsx';
import { AllDoctorRoute } from '../routes/patient/doctor.route.jsx';
// import DoctorRoutes from '../routes/doctor.routes.jsx';
// import AdminRoutes from '../routes/admin.routes.jsx';
import DoctorsList from '../pages/Admin/DoctorsList.jsx';
import { DoctorAllAppointments } from '../pages/doctor/octorAllAppointments.jsx';
import { AdminallAppointments } from '../pages/admin/AdminallAppointments.jsx';
import { DoctorDashBoard } from '../pages/doctor/DoctorDashBoard.jsx';
import { AdminDashBoard } from '../pages/admin/AdminDashBoard.jsx';
import UnverifiedDoctor from '../pages/Admin/VerifyDoctor.jsx';


import {Routes ,Route} from 'react-router-dom'

const App = () => {
  return (
    <div>

      <Toaster />
      <AuthRoutes />
      <ProfileRoute/> 
      <AllDoctorRoute/>
      <Routes>
      <Route path='/ad_dash' element={<DoctorDashBoard/>}></Route>
      <Route path='/all-appointments' element={<DoctorAllAppointments/>}></Route>
      <Route path='/admin_dash' element={<AdminDashBoard/>}></Route>
      <Route path='/admin_all-appointments' element={<AdminallAppointments/>}></Route>
      <Route path='/admin_add-doctor' element={<UnverifiedDoctor></UnverifiedDoctor> }></Route>
      <Route path='/admin_doctor-list' element={ <DoctorsList></DoctorsList> }></Route>
      </Routes>
    </div>
  )
}

export default App;