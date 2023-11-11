import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../../redux/alertsSlice';
import {setDoctor} from '../../redux/doctorSlice';
import {setDoctorTimings} from '../../redux/doctorTimingSlice';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';
import moment from 'moment';

function Profile() {
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
      // setDoctorData(response.data.data)     
      dispatch(setDoctor(response.data.data));    
      toast.success(response.data.message);    
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

  const onFinish = async (values) => {
    try {
      const request = {...values, doctorTimings}

      // console.log("Profile.js request: ", values);

      dispatch(showLoading());
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/update-doctor-account`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });      
      dispatch(hideLoading());

      if (response.data.success) {
        // console.log("update-doctor data success: ", response.data);
        dispatch(setDoctor(values));
        toast.success(response.data.message);
        toast("Being redirected to Home page.");
        navigate('/');
      } else {
        // console.log("Profile.js message: ", response.data)
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log("Profile.js error: ", error)
      toast.error("Something went wrong.")
    }

  }

  useEffect(()=>{
    if(!doctorData ){
      getDoctor();       
    }    
    if(doctorState){
      setDoctorData(doctorState);
    }
    if(doctorState && doctorTimings.length === 0){
      dispatch(setDoctorTimings([moment(doctorState.timings[0]).format("HH:mm"), moment(doctorState.timings[1]).format("HH:mm")]));
    }
    
  },[doctorData, doctorState ])
  

  return (
    <Layout>
      <h1 className='page-title'>Doctor Profile</h1>
      <hr/>
      {doctorData && <DoctorForm onFinish={onFinish} initialValues={doctorData} buttonValue="Update"/>}
    </Layout>
  )
}

export default Profile
