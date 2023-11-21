import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useDispatch} from 'react-redux'
import {toast} from 'react-hot-toast'
import {Table} from 'antd';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios  from 'axios';

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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1 className='normal-text'>{record.firstName} {record.lastName}</h1>
      )
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber"
    },
    {
      title: "Created At",
      dataIndex: "createdAt"
    },
    {
      title: "status",
      dataIndex: "status"
    },
    
  ]

  return (
    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <hr/>
      {/* <Table columns={columns} dataSource={appointments}/> */}

    </Layout>
  )
}

export default Appointments