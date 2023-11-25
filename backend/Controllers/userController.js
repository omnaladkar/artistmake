import User from "../models/UserSchema.js"
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"

export const updateUser =async(req,res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:"successfully updates",
            data: updatedUser,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to update"
        });
        
    }
}

export const getSingleUser =async(req,res) => {
    const id = req.params.id;

    try {
      const user =  await User.findById(id).select('-password');

        res.status(200).json({
            success:true,
            message:"user foundd",
            data: user,
           
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"No user found"
        });
        
    }
}


export const deleteUser =async(req,res) => {
    const id = req.params.id;

    try {
       await User.findByIdAndDelete(
            id,
            
        );

        res.status(200).json({
            success:true,
            message:"successfully deleteds",
           
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to ddeletete"
        });
        
    }
}

export const getAllUser =async(req,res) => {
   

    try {
      const users =  await User.find({}).select('-password');

        res.status(200).json({
            success:true,
            message:"user foundd",
            data: users,
           
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"No user found"
        });
        
    }
};

export const getUserProfile  =  async(req,res)=>{
    const userId = req.userId

     console.log(userId)
    try {
        const user = await User.findById(userId)
        console.log(user,"bhel")

        if(!user){
            return res.status(404).json({success:false,message:'Useer not found'})
        }
        const {password, ...rest} = user._doc
        res.status(200).json({success:true,message:'Profile info is gettting',data:{...rest}})
    } catch (err) {
     res.status(500).json({success:false,message:'not found'})        
    }
}



// export const getMyAppointments =  async(req,res) => {
//     try {

//         const bookings = await Booking.find({user:req.userId})

//         const doctorIds = bookings.map(el=>el.doctor.id)

//         const doctors = await Doctor.find({_id : {$in:doctorIds}}).select('-password')
//         res.status(200).json({success:true,message:'appooinment are getting', data: doctors})
//     } catch (error) {
//         res.status(404).json({
//             success:false,
//             message:"No user found"
//         });
        
//     }
// }

// Backend route to get user appointments
