import React from 'react'
import DoctorCard from '../../Doctors/DoctorCard'
import { doctors } from '../../../assets/data/doctors'
import Testimonial from '../../Testimonials/Testimonial'
export default function Doctors() {
  return (
    <>
    <section className="bg-[#fff9ea]">
        <div className="container text-center">
            <h2 className="heading">
                Find  A doctor
            </h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" placeholder='Search Doctor'/>
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
                Search
            </button>
           
          </div>
        </div>
    </section>

    <section>
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                {doctors.map(doctor=>(
                    <DoctorCard key={doctor.id} doctor={doctor}/>
                ))}
            </div>
        </div>
    </section>
    <section>
  <div className="container">
  <div className="xl:w-[470px] mx-auto">
<h2 className="heading text-center">what our patinet say about us</h2>
<p className="text_para text-center">
World-class care for everyone. Our health System offers unmatched,
expert health care.
</p>
</div>
<Testimonial/>

  </div>
</section>

    </>
  )
}
