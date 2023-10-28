import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoute from "./Routes/auth"
import userRoute from "./Routes/user"
import DoctorRoute from "./Routes/doctors"
import reviewRoute from "./Routes/review"

dotenv.config()

const app = express();
const port  = process.env.PORT || 8000

const corsOptions = {
    origin:true
}

app.get('/',(res,req)=>{
    res.setEncoding('Api is working')
})

mongoose.set('strictQuery',false)
const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log('mongodb database is connected')
    } catch (err) {
            console.log('mongodb COnnection falied')                 
    }
}

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('api/v1/users',userRoute)
app.use('api/v1/doctors',DoctorRoute)
app.use('api/v1/reviews',reviewRoute)


app.listen(port,()=> {
    connectDB();
    console.log(`server is runinng on ${port} ...` )
})