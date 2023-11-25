import express from 'express';
import { getAllBookings, getBookingById, createBooking,  getAlluserBookings } from '../Controllers/bookingController.js';



// Route for getting all bookings

const router  = express.Router({mergeParams:true});

router.route("/").get(getAllBookings).get(getBookingById).post(createBooking);
router.route("/:id").get(getAlluserBookings);
export default router;