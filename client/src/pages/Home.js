import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";

import { useSelector, useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Col, Row } from "antd";

function Home() {
  const loading = useSelector((state) => state.alerts);
  const [doctorsList, setDoctorsList] = useState([]);
  const dispatch = useDispatch();
  
  // console.log("Loading Home.js: ", loading);

  const getData = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/user/get-approved-doctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);
      if (response.data) {
        setDoctorsList(response.data.doctors);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log("Home.js error: ", error);
    }
  };

  useEffect(() => {
    if (doctorsList.length === 0) {
      getData();
    }
  }, [doctorsList]);

  console.log("home.js doctorsList: ", doctorsList);

  return (
    <Layout>
      <h1 className="page-title">Available Doctors:</h1>
      <hr/>
      <Row gutter={20} className="mt-3">
        {doctorsList.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <DoctorCard doctor={doctor} key={doctor._id} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
