import { Toaster } from 'react-hot-toast';
import AuthRoutes from '../routes/auth.routes.jsx';
import { ProfileRoute } from '../routes/profile.routes.jsx';
import { AllDoctorRoute } from '../routes/patient/doctor.route.jsx';


const App = () => {
  return (
    <div>
      <Toaster />
      <AuthRoutes />
      <ProfileRoute/>
      <AllDoctorRoute/>
    </div>
  )
}

export default App;