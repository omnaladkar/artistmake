import React, { useState } from 'react';
import signupImg from "../../assets/images/signup.gif";
import avatar from "../../assets/images/avatar-icon.png";
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

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

    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
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
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate('/login');
      
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      {/* Rest of your JSX */}
      <div className="mb-5">
        {/* Existing input fields */}
        <input type="text"
          placeholder='Please enter your name'
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor  cursor-pointer'
          required
        />
      </div>
      <div className="mb-5">
        {/* Existing input fields */}
        <input type="email"
          placeholder='Please enter your emal'
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor  cursor-pointer'
          required
        />
      </div>
      <div className="mb-5">
        {/* Existing input fields */}
        <input type="password"
          placeholder='Please enter your password'
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor  cursor-pointer'
          required
        />
      </div>
      {/* Rest of your form */}
      <div className="mt-7">
        <button onClick={submitHandler} disabled={loading && true} type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
          {loading ? <HashLoader size={35} color='#ffffff' /> : 'Sign up'}
        </button>
      </div>
      <p className="mt-5 text-textColor text-center">
        already have an account ? <Link to='/login' className='text-primaryColor font-medium ml-1'>
          login
        </Link>
      </p>
      {/* End of form */}
    </section>
  );
};
