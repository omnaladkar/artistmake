// import Doctor from "../models/DoctorSchema"
// export const updateDoctor =async(req,res) => {
//     const id = req.params.id;

//     try {
//         const updatedDoctor = await Doctor.findByIdAndUpdate(
//             id,
//             {$set:req.body},
//             {new:true}
//         );

//         res.status(200).json({
//             success:true,
//             message:"successfully updates",
//             data: updatedDoctor,
//         })
//     } catch (err) {
//         res.status(500).json({
//             success:false,
//             message:"Failed to update"
//         });
        
//     }
// }

// export const getSingleDoctor =async(req,res) => {
//     const id = req.params.id;

//     try {
//       const doctor =  await User.findById(id).populate("reviews").select("-password");

//         res.status(200).json({
//             success:true,
//             message:"Doctor foundd",
//             data: doctor,
           
//         })
//     } catch (err) {
//         res.status(404).json({
//             success:false,
//             message:"No Doctor found"
//         });
        
//     }
// }


// export const deleteDoctor =async(req,res) => {
//     const id = req.params.id;

//     try {
//        await Doctor.findByIdAndDelete(
//             id
            
//         );

//         res.status(200).json({
//             success:true,
//             message:"successfully updates",
           
//         })
//     } catch (err) {
//         res.status(500).json({
//             success:false,
//             message:"Failed to update"
//         });
        
//     }
// }

// export const getAllDoctor =async(req,res) => {


//     try {
//         const {query} = req.query
//   let doctors;
//   if(query) {
//     doctors = await Doctor.find({isApproved:'approved',$or: [{name:{$regex:query,$options:"i"}},{specialization:{$regex:query,$options:"i"}}],
// }).select("-password");
// else {
//     doctors  =await Doctor.find({isApproved: "approved"}).select("-password");

// }

//   }
//         res.status(200).json({
//             success:true,
//             message:"Doctor foundd",
//             data: doctors,
           
//         })
//     } catch (err) {
//         res.status(404).json({
//             success:false,
//             message:"No Doctor found"
//         });
        
//     }
// }

import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Doctor successfully updated",
            data: updatedDoctor,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update doctor",
        });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    

    try {
        const doctor = await Doctor.findById(id).populate("reviews","appointments").select("-password");
  console.log("om heere");
  console.log(doctor)
        if (doctor) {
            res.status(200).json({
                success: true,
                message: "Doctor found",
                data: doctor,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error finding doctor",
        });
    }
};


export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Doctor successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete doctor",
        });
    }
};

export const getAllDoctor = async (req, res) => {
    try {
        const query = req.query.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "Doctors found",
            data: doctors,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error finding doctors",
        });
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId
    console.log(doctorId)
    try {
        const doctor = await Doctor.findById(doctorId)
        console.log(doctor)

        if(!doctor){
            return res.status(404).json({success:false,message:'Docotr not found'})
        }
        const {password, ...rest} = doctor._doc
        const appointments = await Booking.find({doctor:doctorId})
        res.status(200).json({success:true,message:'Profile info is gettting',data:{...rest,appointments}})
    } catch (err) {
     res.status(500).json({success:false,message:'not found'})        
    }
}