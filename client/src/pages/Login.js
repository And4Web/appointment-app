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
        `${process.env.REACT_APP_BACKEND_API_URL}/user/login`,
        values
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        const token = localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error Logging you in");
      console.log("Login.js Error: ", error);
    }
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="authentication" style={{display: "flex", flexDirection: "column"}}>
      <div className="authentication-form card p-3">
        <h1 className=" card-title ">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
            />
          </Form.Item>
          <div className="password-input" onClick={showPasswordHandler}>
            {!showPassword ? (
              <i className="ri-eye-line"></i>
            ) : (
              <i className="ri-eye-off-line"></i>
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
      <div style={{marginTop: "2rem",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h6 style={{color: "red"}}>Sample logins for recruiters:</h6>
        <p style={{color: "red"}}> Admin: ahadmin@gmail.com, Password: admin123</p>
        <p style={{color: "red"}}> user: umesh@gmail.com, Password: umesh123</p>
        <p style={{color: "red"}}> doctor: shivani@gmail.com, Password: shivani123</p>

      </div>
    </div>
  );
}

export default Login;
