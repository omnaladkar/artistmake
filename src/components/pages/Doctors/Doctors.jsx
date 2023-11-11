import React, { useState, useEffect } from 'react';
import DoctorCard from '../../Doctors/DoctorCard';
import Testimonial from '../../Testimonials/Testimonial';
import DoctorList from '../../Doctors/DoctorList';
export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/doctors');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show message, etc.
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      {/* Your JSX for search and other sections */}

      <section>
       <DoctorList/>
      </section>

      <section>
        <div className="container">
          {/* Testimonial section */}
          <h2 className="heading text-center">What our patients say about us</h2>
          <p className="text_para text-center">
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
        <Testimonial />
      </section>
    </>
  );
}
