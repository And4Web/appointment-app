import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
import {toast} from 'react-hot-toast';

import {showLoading, hideLoading} from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';

function DoctorsList() {
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/admin/get-all-doctors`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      if(response.data.success){
        setDoctors(response.data.doctors);
      }else{
        console.log("Doctors lise couldn't be fetched from the database.")
      }
    } catch (error) {
      console.log("DoctorsList.js getAllDoctors Error: ", error)
    }
  }

  const changeDoctorStatus = async (record) => {
    try {
      const payload = {
        userId: record.userId,
        doctorId: record._id,
        status: "approved"
      }
      dispatch(showLoading)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/admin/change-doctor-account-status`, payload, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      dispatch(hideLoading);
      if(response.data){
        toast.success("Doctor's request approved successfully.")
        getAllDoctors();
      }else{
        toast.error("Doctor's request couldn't be approved.")
        console.log('DoctorsList.js response errors: ', response)
      }
    } catch (error) {
      dispatch(hideLoading);
      toast.error("Doctor's request couldn't be approved.")
      console.log("DoctorsList.js changeDoctorStatus Error: ", error)
    }

    
  }

  useEffect(()=>{
    getAllDoctors();
  },[])

  // console.log("doctorsList.js all doctors: ", doctors);

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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === "pending" && <p className='anchor' onClick={()=>changeDoctorStatus(record)}>Approve</p>}
          {record.status === "approved" && <p className='anchor'>Block</p>}
        </div>
      )
    }
  ]

  return (
    <Layout>
      <h1 className='page-title'>Doctors List</h1>
      <hr/>
      <Table columns={columns} dataSource={doctors}/>

    </Layout>
  )
}

export default DoctorsList
