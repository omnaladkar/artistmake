import React,{useEffect,useState} from 'react'
import { BASE_URL } from '../../config';

export default function Appointment({user}) {
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        fetchBookingDetails();
        
      }, []);
      
    
     
    
      const fetchBookingDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/v1/doctors/${user._id}/bookings/`);
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
      
  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Patient Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ticket Price</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Appointment Date</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Is Paid</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((appointment, index) => (
            <tr key={index}>
               <td style={{ padding: '8px', border: '1px solid #ddd' }}>UserName</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{appointment.ticketPrice}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {new Date(appointment.appointmentDate).toLocaleString()}
              </td>
              {appointment.status === 'approved' ? (
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{appointment.status}</td>
              ) : null}
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{appointment.isPaid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';

// export default function AppointmentsTable() {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     // Fetch appointments from your API endpoint
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch('YOUR_API_ENDPOINT');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setAppointments(data); // Assuming data is an array of appointments
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   return (
//     <div>
//       <h2>Appointments</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Ticket Price</th>
//             <th>Appointment Date</th>
//             <th>Status</th>
//             <th>Is Paid</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appointment, index) => (
//             <tr key={index}>
//               <td>{appointment.ticketPrice}</td>
//               <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
//               <td>{appointment.status}</td>
//               <td>{appointment.isPaid ? 'Yes' : 'No'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

