import usefetchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../config";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppointDoc from "../../components/Doctors/AppointDoc";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const { data: userData, loading, error } = usefetchData(`${BASE_URL}/api/v1/users/profile/me`);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/654142843fcb08050620ca8a/bookings/total`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user appointments');
        }

        const userAppointments = await response.json();
        setBookings(userAppointments);
      } catch (error) {
        console.error('Error fetching user appointments:', error);
      }
    };

    if (userData && userData._id) {
      fetchUserAppointments(userData._id);
    }
  }, [userData]);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {bookings.length > 0 ? (
            bookings.map(doctor => (
              (user._id === doctor.user) ?   <AppointDoc doctor={doctor.doctor}/>: null
            ))
          ) : (
            <h2 className="mt-5 text-center text-headingColor leading-7 text-[20px] font-semibold text-primaryColor">
              You have not booked any doctor yet!
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
