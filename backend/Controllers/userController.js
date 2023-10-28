import User from "../models/UserSchema"
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
      const user =  await User.findById(id).select("-password");

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
            message:"successfully updates",
           
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to update"
        });
        
    }
}

export const getAllUser =async(req,res) => {
    const id = req.params.id;

    try {
      const users =  await User.find({}).select("-password");

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
}
