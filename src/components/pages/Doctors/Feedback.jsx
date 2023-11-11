import React, { useState, useEffect } from 'react';
import FeedbackFrom from './FeedbackFrom';
import avatar from '../../../assets/images/avatar-icon.png';
import { formateDate } from '../../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import {BASE_URL} from '../../../config'
import { useParams } from 'react-router-dom';
const {id} = useParams();

export default function Feedback() {
  const [showFeedbackFrom, setShowFeedbackForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from your API endpoint
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}/`); // Replace with your actual API endpoint
        const data = await response.json();
        setReviews(data); // Assuming your API response is an array of reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({reviews.length})
        </h4>
        {reviews.map((review) => (
          <div key={review.id} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              {/* Your existing review display logic here */}
            </div>
            <div className="flex gap-1">
              {[...Array(5).keys()].map((_, index) => (
                <AiFillStar key={index} color='#0067FF' />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackFrom && (
        <div className='text-center'>
          <button className='btn' onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {!showFeedbackFrom && <FeedbackFrom />}
    </div>
  );
}
