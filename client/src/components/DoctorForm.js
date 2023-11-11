import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'


function DoctorForm({onFinish, initialValues, buttonValue}) {
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={{...initialValues,  ...(initialValues && {
      timings: [
        moment(initialValues.timings[0], "HH:mm"),
        moment(initialValues.timings[1], "HH:mm")
      ]
    })}}>
      <h4 className="info-title">Personal Information</h4>
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
        <TimePicker.RangePicker format="HH:mm"/>
        </Form.Item>
      </Col>

      
    </Row>
    <div className="d-flex justify-content-end my-3 ">
      <Button className="primary-button" htmlType="submit">{buttonValue}</Button>
    </div>
  </Form>
  )
}

export default DoctorForm
