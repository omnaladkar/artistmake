import React from 'react'

export default function Profile({userData}) {
  return (
    <div>
         <div className="flex items-center justify-center">
           <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
            <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
                </figure>
            </div>

          <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">Name:
              {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
          Email:  
                 {userData.email}
             </p>
           <p className="text-textColor text-[15px] leading-6 font-medium">
          Blood Type: 
           <span className="ml-2 text-headingColor text-[22px] leading-8">
           {userData.bloodType}
            </span>
               </p>
            </div>

      experience:{userData.experience}
      <br>
      </br>
      Education:{userData.qualifications}
      <br>
      </br>

      <div>Avg Rating: {userData.averageRating},</div>
      <div> Total Ratings: {userData.totalRating}</div>
     

     
    </div>
    
  )
}
