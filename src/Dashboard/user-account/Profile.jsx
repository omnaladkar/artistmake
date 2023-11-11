import { useEffect, useState } from 'react';
import signupImg from "../../assets/images/signup.gif";
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

export default function Profile({ user }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "null",
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ name: user.name, email: user.email, photo: user.photo, gender: user.gender, bloodType: user.bloodType });
  }, [user]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate('/users/profile/me');

    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    // <div className='mt-10'>
    //   <form action="" onSubmit={submitHandler}>
    //     <div className="mb-5">
    //       <input type="text"
    //         placeholder='Full Name'
    //         name="name"
    //         value={formData.name}
    //         onChange={handleInputChange}
    //         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
    //         required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <input type="text"
    //         placeholder='Blood Type'
    //         name="bloodType"
    //         value={formData.bloodType}
    //         onChange={handleInputChange}
    //         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
    //         required
    //       />
    //     </div>


    //     <div className="mt-7">
    //       <button disabled={loading} type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
    //         {loading ? <HashLoader size={35} color='#ffffff' /> : 'Update'}
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div className='mt-10'>
       <form onSubmit={submitHandler}>
             <div className="mb-5">
            <input
              type="name"
              placeholder='Enter Your Username'
              name="name"
              value={formData.name}
              onChange={handleInputChange}
             
              className='w-fullpr-4 py-3 border-b border-solid border-[#f3f5f861] focus:outline-none focus:border cursor-pointer'
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder='Enter Your Username'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
             
              className='w-fullpr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
             aria-readonly 
             readOnly
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
             
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              placeholder='Blood type'
              name="blood type"
            
              value={formData.bloodType}
              onChange={handleInputChange}
              className='w-fullpr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
              required
            />
          </div>
         <div className="mb-5 flex items-center justify-between">
          {/* <label  className='text-headingColor font-bold text-[16px] leading-7'>
            Are youu a: 
            <select name="role"    value={formData.role}
              onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
              <option value="patient">Patient</option>
              <option value="doctor">doctor</option>
            </select>
          </label> */}
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
        {formData.photo &&   <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center'>
            <img src={formData.photo} alt="" className='w-full rounded-full'/>
          </figure>}

          <div>
            <input type="file"
            name='photo'
            id="customFile"
            onChange={handleFileInputChange}
            accept='.jpg , .png'
            className='absolute opacity-0 cursor-pointer'/>
            <label htmlFor="customFile" className='absolute flex items-center px-[0.375] text-[15px] leading-6 overflow-hidden  text-headingColor font-semibold rounded-lg truncate cursor-pointer' >
            {selectedFile? selectedFile.name :"upload photo" }
            </label>
          </div>
         </div>
         <div className="mt-7">
            <button  disabled={loading && true}
            type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={25} color='#fff' /> : 'update'}
            </button>
          </div>

          {/* <p className="mt-5 text-textColor text-center">
            Alredy have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>
              Login
            </Link>
          </p> */}
              
             </form>
    </div>
  );
}

