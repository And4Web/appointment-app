import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        values
      );
      dispatch(hideLoading());
      // console.log("response Login.js: ", response.data)

      if (response.data.success) {
        toast.success(response.data.success);
        const token = localStorage.setItem("token", response.data.token);
        toast("Redirecting to home page.");
        navigate("/");
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error Logging you in");
    }
    // console.log("input from the form: ", values)
    // console.log("response from the server: ", response.data)
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className=" card-title ">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type={`${showPassword ? "text" : "password"}`} placeholder="Enter your password" />
          </Form.Item>
          <div className="password-input" onClick={showPasswordHandler}>
            {!showPassword ? (
              <i className="ri-eye-line" ></i>
            ) : (
              <i className="ri-eye-off-line" ></i>
            )}
            <p>{!showPassword ? "Show Password" : "Hide Password"}</p>
          </div>

          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
          <Link to="/register" className="anchor">
            New User? Register here
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
