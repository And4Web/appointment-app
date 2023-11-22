import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {toast} from 'react-hot-toast'
import axios from 'axios';
import {showLoading, hideLoading} from '../../redux/alertsSlice'
import Layout from '../../components/Layout';
import {Table} from 'antd'
import moment from 'moment';


function DoctorAppointments() {
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      dispatch(showLoading)
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/get-appointments`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      
      dispatch(hideLoading)
      if(response.data.success){
        // toast.success(response.data.message)
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

  const changeAppointmentStatus = async (record, status) => {
    try {
      const payload = {
        patientUserId: record.userInfo._id,
        patient: record.userInfo.name,
        doctorId: record.doctorId,
        doctor: `${record.doctorInfo.firstName} ${record.doctorInfo.lastName}`,
        appointmentId: record._id,
        status
      }
      dispatch(showLoading)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/change-appointment-status`, payload, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      dispatch(hideLoading);
      if(response.data){
        toast.success(`Appointment ${response.data.appointment}.`)
        
      }else{
        toast.error(`Appointment ${response.data.appointment}.`)
        console.log('DoctorsList.js response errors: ', response)
      }
    } catch (error) {
      dispatch(hideLoading);
      toast.error("Appointment request couldn't be approved.")
      console.log("DoctorsList.js changeDoctorStatus Error: ", error)
    }

    
  }

  useEffect(()=>{  
    
      getAppointments();
    
  },[])

  console.log("DoctorAppointments.js : ", appointments);

  const columns = [
    {
      title: "Patient",
      dataIndex: "patient",
      render: (text, record) => (
        <h1 className='normal-text'>{record.userInfo.name}</h1>
      ),
      
    },
    {
      title: "Appointment ID",
      dataIndex: "appointmentId",
      render: (text, record) => (
        <p className='normal-text'>{record.userId}</p>
      ),
      
    },
    {
      title: "Date and Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p className='normal-text'>at {moment(record.time).format("HH:mm")} on {moment(record.date).format("DD-MM-YYYY")}</p>
      ),
      
    },
    {
      title: "Status",
      dataIndex: "status",
      
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === "pending" && (
              <div>
                 <p className='anchor' onClick={()=>changeAppointmentStatus(record, "Approved")}>Approve</p>
                <p className='anchor' onClick={()=>changeAppointmentStatus(record, "Rejected")}>Reject</p>     
          
              </div>
          )
          }     
        </div>
      )
    }
    
    
  ]

  return (
    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <hr/>
      <Table columns={columns} dataSource={appointments} pagination={false}/>
    </Layout>
  )
}

export default DoctorAppointments