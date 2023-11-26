import express from 'express';
import { getAllBookings } from '../Controllers/userBooking.js';


const router  = express.Router({mergeParams:true});

router.route("/").get(getAllBookings)

export default router;
