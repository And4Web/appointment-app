import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

function Register() {

  const onFinish = values => {
    // console.log("input from the form: ", values)
  }

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
          <Button type="primary" htmlType="submit">REGISTER</Button>
          <Link to="/login" className="anchor">
            Have an account? Login here
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
