import React,{useState} from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function FeedbackFrom() {

    const [rating,setRating] = useState(0);
    const [hover,setHover] = useState(0);
    const [reviewText,setReviewText] = useState(0);

    const handleSubmitReview = async e=> {
        e.preventDefault();
    }
  return (
    <form action="">
    <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
            How would you rate the overall experience?*
        </h3>
        <div>
            {[...Array(5).keys()].map((index) => {
                index += 1;
                return (
                    <button
                        key={index}
                        type="button"
                        className={`${
                            index <= ((rating && hover) || hover)
                                ? "text-yellowColor"
                                : "text-gray-400"
                        } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        onClick={() => setRating(index)} onMouseEnter={()=>setHover(index)} onMouseLeave={()=>setHover(rating)} onDoubleClick={()=>{setHover(0); setRating(0);}}
                    >
                        <span>
                            <AiFillStar />
                        </span>
                    </button>
                );
            })}
        </div>
        <div className="mt-[30px]">
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
                How would you rate the overall experoicnce?
            </h3>

            <textarea placeholder="Write your message" rows="5" className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-5 py-3 rounded-md"
            onChange={e=>setReviewText(e.target.value)} ></textarea>
        </div>
        <button type="submit" onClick={handleSubmitReview} className='btn'>
            Submit Feedback
        </button>
    </div>
</form>

   
  )
}
