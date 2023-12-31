import React from 'react'
import  Login  from '../components/pages/Login'
import { Signup } from '../components/pages/Signup.jsx'
import  Services  from '../components/pages/Services.jsx'
import Makeup from '../components/Makeup/Makeup'
import MakeupArtist from '../components/Makeup/MakeupArtist'
import {Home} from '../components/pages/Home'
import Contact from '../components/pages/Contact'
import {Routes,Route} from "react-router-dom"
import Doctors from '../components/pages/Doctors/Doctors'
import DoctorAbout from '../components/pages/Doctors/DoctorAbout'
import DoctorsDetails from '../components/pages/Doctors/DoctorsDetails'
import MyAccount from '../Dashboard/user-account/MyAccount.jsx'
import Dashboard from "../Dashboard/doctor-account/Dashboard"
import Dprofile from "../Dashboard/doctor-account/Profile.jsx"
import Dappointment from "../Dashboard/doctor-account/Appoinment.jsx"

import ProtectedRoute from './ProtectedRoute'
import Profile from '../Dashboard/user-account/Profile.jsx'

export default function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/makeup' element={<Makeup/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:id' element={<DoctorsDetails/>}/>
        <Route path='/doctors/doctors' element={<DoctorAbout/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/users/profiles/me' element={<MyAccount/>} />
          <Route path='/users/profile/me/profile' element={<Profile/>} />
        <Route path='/doctor/profile/me' element={<Dashboard/>}/>
        <Route path='/doctor/appointment' element={<Dappointment/>}/>
        <Route path='/doctor/profile/me/profile' element={<Dprofile/>}/>
      


    </Routes>
    
  )
}