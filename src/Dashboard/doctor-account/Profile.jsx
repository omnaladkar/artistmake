import React from 'react';

export default function Profile({ userData }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mt-8">
        <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
          <img src={userData.photo} alt="" className="w-full h-full rounded-full" />
        </figure>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold text-headingColor">Name: {userData.name}</h3>
        <p className="text-lg font-medium text-textColor">Email: {userData.email}</p>
        <p className="text-lg font-medium text-textColor">Blood Type: <span className="ml-2 text-headingColor text-2xl">{userData.bloodType}</span></p>
        <p className="text-lg font-medium text-textColor">Specialization: {userData.specialization}</p>
        <p className="text-lg font-medium text-textColor">About: {userData.about}</p>
      </div>

      <div className="mt-8 text-center">
        <h4 className="text-xl font-bold text-headingColor">Experience:</h4>
        <ul className="list-disc ml-6">
          {userData.experiences.map((exp, index) => (
            <li key={index} className="text-lg font-medium text-textColor">{exp}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <h4 className="text-xl font-bold text-headingColor">Education:</h4>
        <ul className="list-disc ml-6">
          {userData.qualifications.map((edu, index) => (
            <li key={index} className="text-lg font-medium text-textColor">{edu}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-textColor">Avg Rating: {userData.averageRating}</p>
        <p className="text-lg font-medium text-textColor">Total Ratings: {userData.totalRating}</p>
      </div>
    </div>
  );
}
