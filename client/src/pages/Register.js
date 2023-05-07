import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:5000/api/user/register", values);
      
      dispatch(hideLoading());

      if (response.data.success) {
        // console.log("Register.js data success: ", response.data)
        toast.success(response.data.message);
        toast("Being redirected to Login page.");
        navigate('/login');
      } else {
        // console.log("Register.js message: ", response.data)
        toast.success(response.data.message);
      }
    } catch (error) {
      // console.log("Register.js error: ", error)
      toast.error("Something went wrong.")
    }

    // console.log("input from the Register.js: ", values)
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className=" card-title ">Welcome, Register here</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            REGISTER
          </Button>
          <Link to="/login" className="anchor">
            Have an account? Login here
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
