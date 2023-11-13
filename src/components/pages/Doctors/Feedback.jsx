import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackFrom';
import avatar from '../../../assets/images/avatar-icon.png';
import { formateDate } from '../../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import { BASE_URL } from '../../../config';
import { useParams } from 'react-router-dom';

export default function Feedback() {
  const { id } = useParams();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}/reviews`);
        const data = await response.json();
    
        if (data) {
          setReviews(data);
        } else {
          console.error('Error fetching reviews: The API response did not contain a valid reviews array');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({reviews[0]})
        </h4>
     
         { reviews.map((review) => (
          <div key={review._id} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <div>
                <img src={avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full" />
              </div>
              <div>
                <p className="text-[15px] leading-6 font-semibold text-headingColor">
                  {review.reviewText}
                </p>
                <p className="text-[12px] leading-4 text-textColor">
                  {formateDate(review.createdAt)} {/* Assuming you have a date formatting function */}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
       
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {!showFeedbackForm && <FeedbackForm />}
    </div>
  );
}
