import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {setDoctorTimings} from '../redux/doctorTimingSlice'
import {showLoading, hideLoading} from '../redux/alertsSlice'
import {setDoctor} from '../redux/doctorSlice';
import {toast} from 'react-hot-toast'
import axios from 'axios';

function BookAppointment() {
  const userState = useSelector(state=>state.user.user);
  const doctorState = useSelector(state=>state.doctor.doctor);  
  const doctorTimings = useSelector(state=>state.doctorTimings.doctorTimings);  
  
  const [doctorData, setDoctorData] = useState(null); 

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {doctorId} = useParams();

  const getDoctor = async () => {
   try {
    dispatch(showLoading)
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/profile/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(hideLoading)    

    if(response.data.success){   
      const {firstName,lastName, phoneNumber, specialization, feePerConsultation, doctorId: _id, timings} = response.data.data;   
      setDoctorData({firstName,lastName, phoneNumber, specialization, feePerConsultation, doctorId, timings}) 
      // dispatch(setDoctor(response.data.data))  
      // console.log(firstName,lastName, timings)            
    }else{
      toast.error(response.error)
      console.log("Profile.js doctorData error: ", response.error)
    }
    
   } catch (error) {
    dispatch(hideLoading)
    toast.error("Error getting the profile of Doctor.")
    console.log("Error getting the profile of Doctor.")
   }
  }

  // const onFinish = async (values) => {
  //   try {
  //     const request = {...values, doctorTimings}

  //     // console.log("Profile.js request: ", values);

  //     dispatch(showLoading());
  //     const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/update-doctor-account`, request, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });      
  //     dispatch(hideLoading());

  //     if (response.data.success) {
  //       // console.log("update-doctor data success: ", response.data);
  //       dispatch(setDoctor(values));
  //       toast.success(response.data.message);
  //       toast("Being redirected to Home page.");
  //       navigate('/');
  //     } else {
  //       // console.log("Profile.js message: ", response.data)
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     // console.log("Profile.js error: ", error)
  //     toast.error("Something went wrong.")
  //   }

  // }

  useEffect(()=>{  
    if(!doctorData){
      getDoctor();    
    } 
    
    if(!doctorState && doctorData){
      // setDoctorData(doctorState)
      dispatch(setDoctor(doctorData))
    }
  },[doctorData])


  console.log("bookappointment.js: ", doctorData)
  console.log("bookappointment.js doctorState: ", doctorState?.firstName)
  // const {firstName, lastName} = doctorState;

  return (
    
    <Layout>
      <h1 className='page-title'>Book Appointment</h1>
      <hr/>
      {/* <h2 className='page-title'>Dr. {doctorState.firstName} {doctorState.lastName}</h2> */}
      {doctorId}
    </Layout>
  )
}

export default BookAppointment
