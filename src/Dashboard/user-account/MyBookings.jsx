import usefetchData from "../../hooks/usefetchData"

import { BASE_URL } from "../../config"
import DoctorCard from '../../components/Doctors/DoctorCard'

import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

export default function MyBookings({user}) {

const { doctorId }= useParams();

  const [bookings, setBookings] = useState([]);

  const {
    data:userData,
    loading,
    error,

  } = usefetchData(`${BASE_URL}/api/v1/users/profile/me`);

  const userId = userData._id
 
useEffect(() => {
  const fetchUserAppointments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/doctors/${doctorId}/bookings/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "userId": userId
          
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user appointments');
      }

      const userAppointments = await response.json();
      setBookings(userAppointments);
   
    } catch (error) {
     console.log(400)
      
    }
  };

   // Replace with your actual user ID
    fetchUserAppointments(userId);
  }, []);

 console.log(bookings);





  return (
    
    <div>
      {loading && !error && <Loading/>}
      {error && !loading && <Error errMessage={error}/>}
 
 { !loading &&  !error  && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  <bhel>om nanjna</bhel>
    {
      bookings.map(doctor=>(<DoctorCard doctor={doctor} key={doctor.doctor}/>)
    )}
  </div>
) }
{!loading && !error && bookings.length === 0 && (
  <h2 className="mt-5 text-center text-headingColor leading-7 text-[20px] font-semibold text-primaryColor">
    You did not any doctor yet!
  </h2>
)}
    </div>
    
  )
}
