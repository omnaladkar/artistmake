import express from 'express';
import { getAllBookings, getBookingById, createBooking } from '../Controllers/bookingController.js';

const router = express.Router();

// Route for getting all bookings

router.route("/").get(getAllBookings).get(getBookingById).post(createBooking);
export default router;