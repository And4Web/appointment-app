import React from 'react'
import {Form, Input, Button} from 'antd';

function Login() {
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className=' card-title '>Welcome, Login here</h1>
        <Form layout='vertical'>         
          <Form.Item label="Email" name="email">
            <Input placeholder='Enter your email'/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder='Enter your password'/>
          </Form.Item>
          <Button type='primary'>LOGIN</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login