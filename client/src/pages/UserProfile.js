import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/alertsSlice';
// import {setDoctor} from '../../redux/doctorSlice';
// import {setDoctorTimings} from '../../redux/doctorTimingSlice';
import { useNavigate, useParams } from 'react-router-dom';
// import DoctorForm from '../../components/DoctorForm';
import moment from 'moment';

function UserProfile() {
  const userState = useSelector(state=>state.user.user);  
  
  const [userData, setUserData] = useState(null); 

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {userId} = useParams();

  const getUser = async () => {
   try {
    dispatch(showLoading)
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-user-info-by-id`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(hideLoading)    

    if(response.data.success){ 
      setUserData(response.data.data)        
      toast.success(response.data.message); 
    }else{
      toast.error(response.error)
    }
    
   } catch (error) {
    dispatch(hideLoading)
    toast.error("Error getting the profile of User.")
    console.log("Error getting the profile of User.")
   }
  }

  
  useEffect(()=>{
    if(!userData ){
      getUser();       
    }    
    if(userState){
      setUserData(userState);
    }
    
  },[userData, userState ])
  console.log("UserProfile.js userData: ", userData)

  return (
    <Layout>
      <h1 className='page-title'>User Profile</h1>
      <hr/>

      <div className='card p-2 mb-2 cursor-pointer'>
      <h1 className='card-title'>{userData?.name.toUpperCase()} </h1>
      {userData?.isDoctor? "(Doctor)": userData?.isAdmin? "(Admin)" : '(Patient)'}
      
      <hr/>
      {/* {userData?.isDoctor && (
      <p><b>Specialization:</b> {doctor.specialization}</p>
      <p><b>Experience:</b> {doctor.experience} Years</p>
      <p><b>Phone Number:</b> {doctor.phoneNumber}</p>
      <p><b>Address:</b> {doctor.address}</p>
      <p><b>Fee per visit:</b> &#8377;{doctor.feePerConsultation}</p>
      <p><b>Timings:</b> {doctor.timings[0]}-{doctor.timings[1]}</p> 
      )} */}
      {userData?.isAdmin && (<h1>Admin</h1>)}
      <p><b>UserId:</b> {userData?._id}</p>
      <p><b>Email:</b> {userData?.email}</p>
      <p><b>Account created:</b> {userData?.createdAt}</p>
      {/* <p><b>Address:</b> {doctor.address}</p> */}
    </div>
     
    </Layout>
  )
}

export default UserProfile
