import Booking from '../models/BookingSchema.js';
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"
// Controller for getting all bookings
import { useParams } from 'react-router-dom';
export const gettotalBookings = async (req, res) => {
//   const { doctorId } = req.params;
// console.log(doctorId)

  try {
    
          
    const bookings = await Booking.find({
      // doctor:doctorId
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllBookings = async (req, res) => {
  const { doctorId } = req.params;
console.log(doctorId)

  try {
    
          
    const bookings = await Booking.find({
      doctor:doctorId
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAlluserBookings = async (req, res) => {
  try {
      const query = req.query.query;
      let bookings;

      if (query) {
          bookings = await Booking.find({
              isApproved: 'approved',
          });
      } else {
          bookings = await Booking.find();
      }

      res.status(200).json({
          success: true,
          message: "Bookings found",
          data: doctors,
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: "Error finding doctors",
      });
  }
};


// Controller for getting a specific booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('doctor').populate('user');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const createBooking  = async(req,res)=> {
  if(!req.body.doctor) req.body.doctor = req.params.doctorId 


 const {id} = req.body
 console.log(id)
  const newBooking = new Booking(req.body)


  console.log(req.body.doctor)

  try {
      const savedBooking = await newBooking.save()
      await Doctor.findByIdAndUpdate(req.body.doctor,{
          $push:{appointments: savedBooking._id}
      })



      res.status(200).json({success:true,message:'Revies submitted', data:savedBooking})

      
  } catch (error) {
      res.status(500).json({success:false,message:error.message})
      
  }
}


