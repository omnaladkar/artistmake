import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { BASE_URL } from '../../../config';
import { useParams } from 'react-router-dom';
import usefetchData from '../../../hooks/usefetchData';

export default function SidePanel() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [openCal, setOpenCal] = useState(false);
  const [bookings, setBookings] = useState([]);

  const {id} = useParams();
  const {
    data:userData,
    loading,
    error,

  } = usefetchData(`${BASE_URL}/api/v1/users/profile/me`);

  useEffect(() => {
    fetchBookingDetails();
    
  }, []);
  

 

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}/bookings/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const bookingData = await response.json();
      setBookings(bookingData);
      console.log('Booking details:', bookingData);
    } catch (error) {
      console.error('Error fetching booking details:', error.message);
    }
  };
  










  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = async() => {
    
  
    try {
          const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}/bookings/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ticketPrice: 700, 
  appointmentDate: selectedDate.toISOString() ,
  user: userData._id,
  patient: userData.name,

     
      


             
            }),
          });

   
// "Booking validation failed: appointmentDate: Path `appointmentDate` is required., ticketPrice: Path `ticketPrice` is required."
      
          if (response.ok) {
            console.log('Appointment booked successfully!');
            
          } else {
            console.error('Failed to book appointment:', response.status);
        
          }
          
          setOpenCal(false);
        } catch (error) {
          console.error('Error booking appointment:', error);
          
        }

 
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>

        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          500 BDT
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {bookings.map((booking) => (
            <li key={booking._id}>
              {new Date(booking.appointmentDate).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn px-2 w-full rounded-md"
        onClick={() => setOpenCal(true)}
      >
        Book Appointment
      </button>

      {openCal && (

        <div className="modal">
            <>
            <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
            </>
          

          Time Slots
          <>
          <TimePicker 
            onChange={handleTimeChange}
            value={selectedTime}
            style={{ fontSize: '20px', width: '200px' }}
          />
          </>
          
          <button className="btn" onClick={handleBookAppointment}>
            Confirm Appointment
          </button>
          <button className="btn" onClick={() => setOpenCal(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}