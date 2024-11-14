import { Toaster } from 'react-hot-toast';
import AuthRoutes from '../routes/auth.routes.jsx';
import { ProfileRoute } from '../routes/profile.routes.jsx';

const App = () => {
  return (
    <div>
      <AuthRoutes />
      <ProfileRoute/>
      <Toaster />
    </div>
  )
}

export default App;