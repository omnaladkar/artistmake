import usefetchData from "../../hooks/usefetchData"
import { BASE_URL } from "../../config"
import DoctorCard from '../../components/Doctors/DoctorCard'
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"

export default function MyBookings() {

  const {data:appointments,loading,error} = usefetchData(`${BASE_URL}/users/appointment/my-appointments`)
    return (<div>
      {loading && !error <Loading/>}
      {error && !loading && <Error errMessage={error}/>}
 {
  !loading &&  !error && <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
    {
      appointments.map(doctor=><DoctorCard doctor={doctor} key={doctor._id}/>)
    }
  </div>
 }
    </div>
  )
}
