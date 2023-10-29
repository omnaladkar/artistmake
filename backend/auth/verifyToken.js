import jwt from "jsonwebtoken"
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"

export const authenticate = async(req,res,next) => {
    const authToken = req.headers.authorization;
    if(!authToken || !authToken.startWith("Bearer ")){
        return res.status(401).json({
            success:false, message:"no token , authorization denied"
        });
    }

    try {

        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
       req.userId = decoded.id
       req.role = decoded.role       
        console.log(authToken);
        next();
    } catch (err) {

        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message:'token is expired'})

        }

        return res.status(401).json({success:false,message:'Invalid token'})
        
    }
}

export const restrict  = roles=> async(req,res,next) => {
    const userId = req.userId

    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient){
        user = patient
    }
    if(doctor){
        user = doctor
    }
    if(!getRoles.includes(user.role)){
      return res.status(401).json({success:false,message:"you are not authrozed"})
    }

    next();
}