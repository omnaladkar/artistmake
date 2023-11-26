import express from "express"
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile} from "../Controllers/doctorController.js"
import { authenticate,restrict } from "../auth/verifyToken.js"

import reviewRouter from "./review.js"
import bookingRouter from "./booking.js"




const router= express.Router()

router.use("/:doctorId/reviews",reviewRouter);
router.use("/:doctorId/bookings",bookingRouter);


router.get('/:id',getSingleDoctor)
router.get('/',getAllDoctor)
router.put('/:id',updateDoctor)
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor) 
router.get('/profile/me',authenticate,getDoctorProfile)
export default router