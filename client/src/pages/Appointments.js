import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useDispatch} from 'react-redux'
import {toast} from 'react-hot-toast'
import {Table} from 'antd';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios  from 'axios';
import moment from 'moment';

function Appointments() {
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      dispatch(showLoading)
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/user/get-appointments`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      
      dispatch(hideLoading)
      if(response.data.success){
        toast.success(response.data.message)
        // console.log("Appointments.js response: ", response.data);
        setAppointments(response.data?.data);
      }else{
        toast.error("No Appointments.")
        console.log("No Appointments.")
      }
    } catch (error) {
      toast.error(error.message)
      console.log("Appointments.js getAppointments Error: ", error)
    }
  }

  // const changeDoctorStatus = async (record) => {
  //   try {
  //     const payload = {
  //       userId: record.userId,
  //       doctorId: record._id,
  //       status: "approved"
  //     }
  //     dispatch(showLoading)
  //     const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/admin/change-doctor-account-status`, payload, {headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     }})
  //     dispatch(hideLoading);
  //     if(response.data){
  //       toast.success("Doctor's request approved successfully.")
  //       getAllDoctors();
  //     }else{
  //       toast.error("Doctor's request couldn't be approved.")
  //       console.log('DoctorsList.js response errors: ', response)
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading);
  //     toast.error("Doctor's request couldn't be approved.")
  //     console.log("DoctorsList.js changeDoctorStatus Error: ", error)
  //   }

    
  // }

  useEffect(()=>{  
    
      getAppointments();
    
  },[])

  console.log("Appointments.js all appointments: ", appointments);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <h1 className='normal-text'>Dr. {record.doctorInfo.firstName} {record.doctorInfo.lastName}</h1>
      )
    },
    {
      title: "Appointment ID",
      dataIndex: "appointmentId",
      render: (text, record) => (
        <h1 className='normal-text'>{record._id}</h1>
      )
    },
    {
      title: "Date and Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <h1 className='normal-text'>at {moment(record.time).format("HH:mm")} on {moment(record.date).format("DD-MM-YYYY")}</h1>
      )
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    
  ]

  return (
    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <hr/>
      <Table columns={columns} dataSource={appointments}/>

    </Layout>
  )
}

export default Appointments