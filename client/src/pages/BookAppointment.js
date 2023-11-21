import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setDoctorTimings } from "../redux/doctorTimingSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { setDoctor } from "../redux/doctorSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";

function BookAppointment() {
  const userState = useSelector((state) => state.user.user);

  const [doctorData, setDoctorData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctorId } = useParams();

  const getDoctor = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/doctor/profile/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);

      if (response.data.success) {
        const {
          firstName,
          lastName,
          phoneNumber,
          specialization,
          feePerConsultation,
          doctorId: _id,
          timings,
        } = response.data.data;
        setDoctorData({
          firstName,
          lastName,
          phoneNumber,
          specialization,
          feePerConsultation,
          doctorId,
          timings,
        });
      } else {
        toast.error(response.error);
        console.log("Profile.js doctorData error: ", response.error);
      }
    } catch (error) {
      dispatch(hideLoading);
      toast.error("Error getting the profile of Doctor.");
      console.log("Error getting the profile of Doctor.");
    }
  };

  const bookNow = async () =>{
    try {
      setIsAvailable(false)
      dispatch(showLoading)
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/book-appointment`,{
        doctorId, userId: userState._id, date: moment(date, "DD-MM-YYYY").toISOString(), time: moment(time, "HH:mm").toISOString(), doctorInfo: doctorData, userInfo: userState
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      dispatch(hideLoading)
      if(response.data.success){
        toast.success(response.data.message)
        setIsAvailable(false)
      }
      
    } catch (error) {
      dispatch(hideLoading)
      toast.error("Error booking appointment.")
    }
  }

  const checkAvalability = async () =>{
    try {
      setIsAvailable(false);
      dispatch(showLoading)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/doctor/check-availability`,{
        doctorId, date: moment(date, "DD-MM-YYYY").toISOString(), time: moment(time, "HH:mm").toISOString()},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      dispatch(hideLoading)
      if(response.data.success){
        setIsAvailable(true);
        toast.success(response.data.message)
      }else{
        setIsAvailable(false);
        toast.error(response.data.message)
      }
      
    } catch (error) {
      setIsAvailable(false)
      dispatch(hideLoading)
      toast.error("Error booking appointment.")
    }
  }


  useEffect(() => {
    if (!doctorData) {
      getDoctor();
    }
  }, [doctorData]);

  console.log("bookapointment.js: ", doctorData);

  return (
    <Layout>
      {doctorData && (
        <div>
          <h1 className="page-title">Book Appointment</h1>
          <hr />
          <h3 className="page-title">
            {doctorData
              ? `Dr. ${doctorData?.firstName} ${doctorData?.lastName} `
              : null}
          </h3>
          <hr />
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <h4 className="normal-text">
              <b>Timings:</b> {doctorData.timings[0]}-{doctorData.timings[1]}
            </h4>
            <div>
              <h4 className="page-title ">Doctor Information</h4>
              <hr/>
              <h4 className="normal-text">
              <b>Specialization:</b> {doctorData.specialization}
            </h4>
            <h4 className="normal-text">
              <b>Fee per consultation:</b> &#8377;{doctorData.feePerConsultation}
            </h4>
            </div>

          </div>
          <Row gutter={20}>
            <Col span={8} lg={8} sm={24} xs={24}>
              <div className="d-flex flex-column pt-2">
                <DatePicker format="DD-MM-YYYY" onChange={(value)=>setDate(moment(value).format("DD-MM-YYYY"))}/>
                <TimePicker format="HH:mm" className="mt-3" onChange={(value)=>setTime(moment(value).format("HH:mm"))}/>
                <Button className="primary-button mt-3 full-width-button" onClick={checkAvalability}>Check Availability</Button>
                {isAvailable && <Button className="primary-button mt-3 full-width-button" onClick={bookNow}>Book Now</Button>}
              </div>
            </Col>
            {/* <Col span={8} sm={24} xs={24} lg={8}>
              <div className="d-flex flex-column pt-2 ">
                
                <hr/>
              </div>
            </Col> */}
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
