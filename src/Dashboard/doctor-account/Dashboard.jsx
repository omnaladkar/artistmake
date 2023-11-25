import React from 'react'
import {useContext,useState} from 'react'
import { authContext } from '../../context/AuthContext'
import userImg from  "../../assets/images/doctor-img01.png"
import Loading from '../../components/Loader/Loading';
// import MyBookings from './MyBookings';
// import Profile from './Profile';
import Error from '../../components/Error/Error';
import { Link, useHistory } from 'react-router-dom';
import usefetchData from '../../hooks/usefetchData';
import { BASE_URL } from '../../config';
import Profile from './Profile';
import Appointment from './Appoinment'
import Edit from './Edit';

export default function Dashboard() {
  const  {dispatch} =  useContext(authContext);
  const [tab, setTab]  =useState('bookings');
    const {
    data:userData,
    loading,
    error,

  } = usefetchData(`${BASE_URL}/api/v1/doctors/profile/me`);
     console.log(userData,'userdata');
     const handleDelete  =() => {
      dispatch({type:"DELETE"})
    }
  
    const handleLogout = () => {
      dispatch({type:"LOGOUT"})
     
    }
  return (
    <section>
    <div className="max-w-[1170px] px-5 mx-auto">
    {loading && !error && <Loading/>}
    {error && !loading && <Error errMessage={error}/>}

   
   { ! loading && !error && <div className="grid md:grid-cols-3 gap-10">
    <div className="pb-[50px] px-[30px] rounded-md">
      <div className="flex items-center justify-center">

      <div className="mt-[50px] md:mt-[100px]">

      



      <button onClick={()=>setTab('profile')} className={`${tab==="profile" } w-full bg-[#eb9a9a]  p-3 text-[16px] leading-7 rounded-md text-white`}>
Overview
</button>

<button onClick={()=>setTab('appointment')} className={`${tab==="appointment" } w-full bg-[#efa5a5]  mt-4 p-3 text-[16px] leading-7 rounded-md text-white`}  >

  Appointments
</button>
<button onClick={()=>setTab('edit')} className={`${tab==="edit" } w-full bg-[#efa5a5]  mt-4 p-3 text-[16px] leading-7 rounded-md text-white`}  >

  Edit Profile
</button>









</div>
         

        {/* <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
        <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
        </figure> */}
      </div>

      {/* <div className="text-center mt-4">
        <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
        {userData.name}
        </h3>
        <p className="text-textColor text-[15px] leading-6 font-medium">
        {userData.email}
        </p>
        <p className="text-textColor text-[15px] leading-6 font-medium">
          Blood Type: 
          <span className="ml-2 text-headingColor text-[22px] leading-8">
           {userData.bloodType}
          </span>
        </p>
      </div> */}
      <div className="mt-[50px] md:mt-[100px]">

      

        <Link to='/home'>
        <button className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleLogout} >

          logout
        </button>
        </Link>
        <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleDelete}>
          Delete accont
        </button>
      </div>
    </div>

    <div className="md:col-span-2 md:px-[30px]">
    

          

     

    {
         tab==='appointment' && <Appointment user={userData}/>
       }
       {
         tab==='profile' && <Profile userData ={userData}/>
       }
        {
         tab==='edit' && <Edit user ={userData}/>
       }
     

     
    </div>


  </div>
   }
  </div>
  </section>
  )
}



 

