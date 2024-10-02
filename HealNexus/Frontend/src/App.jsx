import { Toaster } from 'react-hot-toast';
import AuthRoutes from '../routes/auth.routes.jsx';

const App = () => {
  return (
    <div>
      <AuthRoutes />
      <Toaster />
    </div>
  )
}

export default App;