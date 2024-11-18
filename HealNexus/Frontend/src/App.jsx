import { Toaster } from 'react-hot-toast';
import AuthRoutes from '../routes/auth.routes.jsx';
import { ProfileRoute } from '../routes/profile.routes.jsx';
import { AllPatientRoutes } from '../routes/patient/patient.route.jsx';
import { DoctorRoutes } from '../routes/doctor.routes.jsx';
import { AdminRoutes } from '../routes/admin.routes.jsx';

const App = () => {
  return (
    <div>

      <Toaster />
      <AuthRoutes />
      <ProfileRoute/> 
      <AllPatientRoutes/>
      <DoctorRoutes/>
      <AdminRoutes/>
    </div>
  )
}

export default App;