import express from "express"
import {updateUser,deleteUser,getAllUser,getSingleUser,getUserProfile } from "../Controllers/userController.js"
import { authenticate,restrict } from "../auth/verifyToken.js"
import bookingRouter from "./userAppointment.js"

const router= express.Router()

router.use("/:userId/bookings",bookingRouter);


router.get('/:id',authenticate,restrict(["patient"]), getSingleUser)
router.get('/',authenticate,restrict(["admin"]),getAllUser)
router.put('/:id',authenticate,updateUser)
router.delete('/:id',authenticate,deleteUser) 
router.get("/profile/me",authenticate,getUserProfile);
// router.get(":id/appointment/my-appointments",getMyAppointments);

export default router
