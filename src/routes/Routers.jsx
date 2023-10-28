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
        <Route path='/contact' element={<Contact/>}/>
       

    </Routes>
    
  )
}