import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

export default function SidePanel() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [openCal, setOpenCal] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    
    console.log('Booking appointment:', selectedDate, selectedTime);

    
    setOpenCal(false);
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
          {/* Your existing time slots */}
          {/* ... */}
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