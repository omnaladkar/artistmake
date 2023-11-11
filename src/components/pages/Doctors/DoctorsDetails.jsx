import React, { useState,useEffect } from 'react'
import axios from 'axios'
import doctorImg from '../../../assets/images/doctor-img02.png'
import starIcon from '../../../assets/images/Star.png'
import DoctorAbout from './DoctorAbout'
import Feedback from './Feedback'
import SidePanel from './SidePanel'
import { useParams } from 'react-router-dom';


export default function DoctorsDetails() {
const [tab,setTab] = useState('about')
const [doctors, setDoctors] = useState([]);
const {id} = useParams();

  useEffect(() => {
    // Fetch data from the API
    axios.get(`http://localhost:5000/api/v1/doctors/${id}`)
      .then(response => {
        setDoctors(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []); 
   
 const {name,avgRating,totalRating,photo,specialization,totalPatient,hospital} = doctors
  return (
    <section>
    <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
                <div className="flex items-center gap-5">
                    <figure className="max-w-[200px] max-h-[200px]">
                        <img src={photo} alt="" className="w-full" />
                    </figure>
                    <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                            {specialization}
                        </span>
                        <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{name}</h3>
                        <div className="flex items-center gap-[6px]">
                            <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                <img src={starIcon} alt="" /> {avgRating}
                            </span>
                            <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                                {totalRating}
                            </span>
                        </div>
                        <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                           {hospital}
                        </p>
                    </div>
                </div>



              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button onClick={() => setTab("about")} className={`${
                    tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                    ABout
                </button>

                <button onClick={() => setTab("feedback")}
                
                className={`${
                    tab=== "feedback" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                    Feedback

                </button>
              </div>


              <div className="mt-[50px]">
                {
                   tab === 'about' && <DoctorAbout name={name} hospital={hospital} specialization={specialization} education={name}/>
                }
                {
                    tab === 'feedback' && <Feedback/>
                }
              </div>


            </div>
            <div>
                <SidePanel/>
            </div>
        </div>
    </div>
</section>

  )
}
