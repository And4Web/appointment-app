import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading, hideLoading} from '../../redux/alertsSlice';
import { useParams } from 'react-router-dom'

function Profile() {
  const userState = useSelector(state=>state.user.user);

  const dispatch = useDispatch();
  const {doctorId} = useParams();

  

  const getDoctor = async () => {
   try {
    dispatch(showLoading)
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/profile/${doctorId}`, {
      header: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    dispatch(hideLoading)
    if(response.data.success){
      console.log("Profile.js: ", response.data)
    }else{
      console.log("Profile.js: ", response.data)
    }
   } catch (error) {
    dispatch(hideLoading)
    toast.error("Error getting the profile of Doctor.")
    console.log("Error getting the profile of Doctor.")
   }


  }
  const getUser = async () => {}

  useEffect(()=>{
    getDoctor()
  },[])


  return (
    <Layout>
      <h1 className='page-title'>Doctor Profile</h1>
      <hr/>
    </Layout>
  )
}

export default Profile
