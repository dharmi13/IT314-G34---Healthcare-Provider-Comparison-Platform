import { Route,Routes } from "react-router-dom"
import { ProfileCard } from "../pages/Profiles/ProfileCard/ProfileCard"
export function ProfileRoute(){
   return <Routes><Route path="/profile/:role" element={<ProfileCard />} /></Routes>   
}