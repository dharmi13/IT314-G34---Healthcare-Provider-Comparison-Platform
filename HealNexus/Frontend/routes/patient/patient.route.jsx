import {Routes,Route} from 'react-router-dom'
import { Doctors } from '../../pages/Doctors'
import MyAppointments from '../../pages/MyAppointment'
export function AllPatientRoutes(){
    return <Routes>
    <Route path='/doctors' element={<Doctors/>}></Route>
    <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
    <Route path='/my-appointments' element={<MyAppointments/>}/>
  </Routes>
}