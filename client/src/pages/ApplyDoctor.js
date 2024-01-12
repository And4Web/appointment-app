import Layout from "../components/Layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";

import { hideLoading, showLoading } from "../redux/alertsSlice";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function ApplyDoctor() {
  const doctorTimings = useSelector(
    (state) => state.doctorTimings.doctorTimings
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let request = {
        ...values,
        timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ],
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/admin/apply-doctor-account`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/");
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} buttonValue="Submit" />
    </Layout>
  );
}

export default ApplyDoctor;
