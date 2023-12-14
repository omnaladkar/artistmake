import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import axios from 'axios';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://doctor-appoint-u86o.onrender.com/api/v1/doctors')
      .then(response => {
        setDoctors(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
}
