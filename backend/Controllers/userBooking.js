import Booking from '../models/BookingSchema.js';
import Doctor from "../models/DoctorSchema.js"

import User from "../models/UserSchema.js"
// Controller for getting all bookings


export const getAllBookings = async (req, res) => {
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
            data: User,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error finding doctors",
        });
    }
  };
  