import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import avatar from '../../assets/images/avatar-icon.png'
import { HashLoader } from 'react-spinners';
import { BASE_URL } from '../../config.js';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import signupImg from "../../assets/images/signup.gif"
export const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: 'patient',
  });

  const navigate = useNavigate();
  
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      setLoading(true);
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message || "Failed to register. Please try again.");
      }

      toast.success(message);
      setLoading(false);
      navigate('/login');
      
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
    <div className="max-w-[1170px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block bg-primaryColor-l-lg">
          <figure className="rounded-l-lg">
            <img src={signupImg} alt="" />
          </figure>
        </div>
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-primaryColor">Account</span>
              </h3>
             <form onSubmit={submitHandler}>
             <div className="mb-5">
            <input
              type="name"
              placeholder='Enter Your Username'
              name="name"
              value={formData.name}
              onChange={handleInputChange}
             
              className='w-fullpr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder='Enter Your email'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
             
              className='w-fullpr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder='Enter Your Username'
              name="password"
            
              value={formData.password}
              onChange={handleInputChange}
              className='w-fullpr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
              required
            />
          </div>
         <div className="mb-5 flex items-center justify-between">
          <label  className='text-headingColor font-bold text-[16px] leading-7'>
            Are youu a: 
            <select name="role"    value={formData.role}
              onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
              <option value="patient">Patient</option>
              <option value="doctor">doctor</option>
            </select>
          </label>
          <label  className='text-headingColor font-bold text-[16px] leading-7'>
           Gender: 
            <select name="gender"    value={formData.gender}
              onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
              <option value="patient">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
         </div>

         <div className="mb-5 flex items-center gap-3">
        {!selectedFile &&   <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
            <img src={previewURL} alt="" className='w-full rounded-full'/>
          </figure>}

          <div>
            <input type="file"
            name='photo'
            id="customFile"
            onChange={handleFileInputChange}
            accept='.jpg , .png'
            className='absolute  cursor-pointer'/>
            <label htmlFor="customFile" className='absolute flex items-center px-[0.375] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer' >
              upload photo
            </label>
          </div>
         </div>
         <div className="mt-7">
            <button  disabled={loading && true}
            type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={25} color='#fff' /> : 'SignUp'}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Alredy have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>
              Login
            </Link>
          </p>
              
             </form>
            </div>
      </div>
    </div>
    </section>
  );
};
