import React from "react";
import {Link} from 'react-router-dom'
import { Form, Input, Button } from "antd";

function Login() {

  const onFinish = values => {
    // console.log("input from the form: ", values)
  }

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className=" card-title ">Welcome, Login here</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">LOGIN</Button>
          <Link to="/register" className="anchor">
            New User? Register here
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
