




import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

  bookingSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:"name photo",
    });

    next();
  })

  bookingSchema.statics.calcBooking = async function(doctorId){
    const stats = await this.aggregate([{
        $match:{doctor:doctorId},
    },{
        $group: {
            _id:'$doctor',
            numOfRating: {$sum:1},
            avgBooking:{$avg:'$booking'}
        }
    }]);

    

 
  }
  bookingSchema.post('save',function()
  {
    this.constructor.calcBooking(this.doctor)

  })


export default mongoose.model("Booking", bookingSchema);