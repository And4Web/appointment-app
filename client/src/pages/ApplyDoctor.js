import { Form, Item, Col, Row, Input, TimePicker, Space, Button } from "antd";
import Layout from "../components/Layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {toast} from 'react-hot-toast';

import {hideLoading, showLoading} from '../redux/alertsSlice';
// import {} from '../redux/userSlice';

function ApplyDoctor() {
  // const user = useSelector(state=>state.user.user)
  // console.log("applyDoctor: ", user)
  const [addTimings, setAddTimings] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/apply-doctor-account`, values, {
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
      <h4 className="info-title">Personal Information</h4>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={10}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Last Name" name="lastName">
              <Input placeholder="last name" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Address" name="address" required>
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <hr/>
        <h4 className="info-title">Professional Information</h4>
        <Row gutter={10}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Experience" name="experience">
              <Input placeholder="Experience" type="number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Fee per consultation" name="feePerConsultation">
              <Input placeholder="Fee per consultation" type="number"/>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Timings" name="timings">
            <TimePicker.RangePicker />
            </Form.Item>
          </Col>

          
        </Row>
        <div className="d-flex justify-content-end my-3 ">
          <Button className="primary-button" htmlType="submit">Submit</Button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
