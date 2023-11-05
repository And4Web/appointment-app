import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd';

function DoctorsList() {

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
      console.log("DoctorsList.js Error: ", error)
    }
  }

  useEffect(()=>{
    getAllDoctors();
  },[])

  console.log("doctorsList.js all doctors: ", doctors);

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
          {record.status === "pending" && <p className='anchor'>Approve</p>}
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
