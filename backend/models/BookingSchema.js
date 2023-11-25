




import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";
import User from "./UserSchema.js"

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: Doctor,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    ticketPrice: { type: String, required: true },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    },
  
  { timestamps: true });

  

 
 


export default mongoose.model("Booking", bookingSchema);