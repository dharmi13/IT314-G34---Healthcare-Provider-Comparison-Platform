import {Routes,Route} from 'react-router-dom'
import { Doctors } from '../../pages/Doctors'
export function AllDoctorRoute(){
    return <Routes>
    <Route path='/doctors' element={<Doctors/>}></Route>
    <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
  </Routes>
}