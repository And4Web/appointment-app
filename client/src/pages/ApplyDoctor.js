import { Form, Item, Col, Row, Input, TimePicker, Space, Button } from "antd";
import Layout from "../components/Layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {toast} from 'react-hot-toast';

import {hideLoading, showLoading} from '../redux/alertsSlice';
import DoctorForm from "../components/DoctorForm";
import moment from "moment";
// import {} from '../redux/userSlice';

function ApplyDoctor() {
  // const user = useSelector(state=>state.user.user)
  // console.log("applyDoctor: ", user)
  const doctorTimings = useSelector(state=>state.doctorTimings.doctorTimings); 
  // const [addTimings, setAddTimings] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let request = {
        ...values, timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm")
        ]
      }
      console.log("ApplyDoctor.js request: ", request);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/admin/apply-doctor-account`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });      
      dispatch(hideLoading());

      if (response.data.success) {
        console.log("apply-doctor data success: ", response.data)
        toast.success(response.data.message);
        toast("Being redirected to Home page.");
        navigate('/');
      } else {
        // console.log("Register.js message: ", response.data)
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log("Register.js error: ", error)
      toast.error("Something went wrong.")
    }

  }

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
     <DoctorForm onFinish={onFinish} buttonValue="Submit"/>
    </Layout>
  );
}

export default ApplyDoctor;
