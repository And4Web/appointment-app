import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Button} from 'antd';

function Register() {
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className=' card-title '>Welcome, Register here</h1>
        <Form layout='vertical'>
          <Form.Item label="Name" name="name">
            <Input placeholder='Enter your name'/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder='Enter your email'/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder='Enter your password'/>
          </Form.Item>
          <Button type='primary'>REGISTER</Button>
          <Link to='/login' className='anchor'>Click here to login</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register