import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/register`, values);      
      dispatch(hideLoading());

      if (response.data.success) {
        console.log("Register.js data success: ", response.data)
        toast.success(response.data.message);
        toast("Being redirected to Login page.");
        navigate('/login');
      } else {
        // console.log("Register.js message: ", response.data)
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log("Register.js error: ", error)
      toast.error("Something went wrong.")
    }

    // console.log("input from the Register.js: ", values)
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className=" card-title ">Create new account</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>
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
