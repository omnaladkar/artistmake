import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

export default function Edit({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualifications: [],
    experiences: [],
    photo: "",
    phone: "",
    ticketPrice: "",
    role: "",
    specialization: "",
    bio: "",
    about: "",
    timeSlots: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      name: user.name,
      email: user.email,
      qualifications: Array.isArray(user.qualifications) ? user.qualifications : [],
      experiences: Array.isArray(user.experiences) ? user.experiences : [],
      phone: user.phone || "",
      ticketPrice: user.ticketPrice || "",
      role: user.role || "",
      specialization: user.specialization || "",
      bio: user.bio || "",
      about: user.about || "",
      timeSlots: Array.isArray(user.timeSlots) ? user.timeSlots : [],
    }));
  }, [user]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "qualifications" || name === "experiences" || name === "timeSlots") {
      setFormData(prevData => ({
        ...prevData,
        [name]: value.split(", "),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData(prevData => ({ ...prevData, photo: data.url }));
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <div className='mt-10'>
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          Name:<br></br>
          <input
            type="text"
            placeholder='Enter Your Username'
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#f3f5f861] focus:outline-none focus:border cursor-pointer'
            required
          />
        </div>
        <div className="mb-5">
          Email: <br></br>
          <input
            type="email"
            placeholder='Enter Your Email'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
            readOnly
          />
        </div>
        <div className="mb-5">
          Password: <br></br>
          <input
            type="password"
            placeholder='Enter Your Password'
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          Phone: <br></br>
          <input
            type="text"
            placeholder='Enter Phone Number'
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          Role: <br></br>
          <input
            type="text"
            placeholder='Enter Role'
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          Specialization: <br></br>
          <input
            type="text"
            placeholder='Enter Specialization'
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          Bio: <br></br>
          <textarea
            placeholder='Enter Bio'
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          About: <br></br>
          <textarea
            placeholder='Enter About'
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5">
          Qualifications : <br></br>
          <input
            type="text"
            placeholder='Qualification'
            name="qualifications"
            value={formData.qualifications.join(", ")}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
            required
          />
        </div>
        <div className="mb-5">
          Experience : <br></br>
          <input
            type="text"
            placeholder='Experience'
            name="experiences"
            value={formData.experiences.join(", ")}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
            required
          />
        </div>
        <div className="mb-5">
          Time Slots : <br></br>
          <input
            type="text"
            placeholder='Time Slots'
            name="timeSlots"
            value={formData.timeSlots.join(", ")}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor cursor-pointer'
          />
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center'>
              <img src={formData.photo} alt="" className='w-full rounded-full'/>
            </figure>
          )}
          <div>
            <input
              type="file"
              name='photo'
              id="customFile"
              onChange={handleFileInputChange}
              accept='.jpg , .png'
              className='absolute opacity-0 cursor-pointer'
            />
            <label htmlFor="customFile" className='absolute flex items-center px-[0.375] text-[15px] leading-6 overflow-hidden  text-headingColor font-semibold rounded-lg truncate cursor-pointer' >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            type='submit'
            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
            {loading ? <HashLoader size={25} color='#fff' /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
