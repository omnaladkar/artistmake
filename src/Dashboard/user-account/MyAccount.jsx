import {useContext,useState} from 'react'
import userImg from  "../../assets/images/doctor-img01.png"
import { authContext } from '../../context/AuthContext'
import Loading from '../../components/Loader/Loading';
import MyBookings from './MyBookings';
import Profile from './Profile';
import Error from '../../components/Error/Error';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { token } from '../../config';

import usefetchData from '../../hooks/usefetchData';
import { BASE_URL } from '../../config';
 

export default function MyAccount() {
  const  {dispatch} =  useContext(authContext);
  const [tab, setTab]  =useState('bookings');


  const {
    data:userData,
    loading,
    error,

  } = usefetchData(`${BASE_URL}/api/v1/users/profile/me`);

  console.log(userData,'userdata');

  const handleDelete = async () => {
    

    try {
      
     

      const response = await axios.delete(
          `${BASE_URL}/api/v1/users/${userData._id}`,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  
                  'Content-Type': 'application/json',
                  
              },
          }
      );

      // dispatch({type:"DELETE"})

      console.log(response.data);
  } catch (error) {
      console.error('Error deleting user:', error.message);
      
    } 
  }

  const handleLogout = () => {
    localStorage.clear()
    console.log("logout");
  }
   return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
      {loading && !error && <Loading/>}
      {error && !loading && <Error errMessage={error}/>}

     
     { ! loading && !error && <div className="grid md:grid-cols-3 gap-10">
      <div className="pb-[50px] px-[30px] rounded-md">
        <div className="flex items-center justify-center">
          <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
          <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
          </figure>
        </div>

        <div className="text-center mt-4">
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
        </div>
        <div className="mt-[50px] md:mt-[100px]">
          
          <button className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleLogout} >
            <Link to='/login'>
            logout
            </Link>
           
          </button>
         
          
          <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleDelete}>
          <Link to='/home'>
            Delete accont
            </Link>
          </button>
        
         
        </div>
      </div>

      <div className="md:col-span-2 md:px-[30px]">
        <div>
          <button  onClick={()=>setTab('booking')} className={`${tab==="booking" && "bg-primaryColor text-white font-normal"} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
            My Bookings
          </button>
          
          <button onClick={()=>setTab('settings')} className={`${tab==="settings" && "bg-primaryColor text-white font-normal"} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
          Profile Setting 
          </button>
         
          
        </div>


       {
         tab==='booking' && <MyBookings user={userData}/>
       }
       {
         tab==='settings' && <Profile user ={userData}/>
       }
      </div>


    </div>
     }
    </div>
    </section>
   )
 }
 
 

