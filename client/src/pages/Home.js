import React, {useEffect} from "react";
import axios from "axios";

import Layout from "../components/Layout";

import {useSelector, useDispatch} from 'react-redux';

function Home() {
  const loading = useSelector(state=>state.alerts);
  // console.log("Loading Home.js: ", loading);

  const getData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/get-user-info-by-id`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      // console.log("Home.js response: ", response.data);
    } catch (error) {
      console.log("Home.js error: ", error);
    }
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
    <Layout>
      <h1 className="page-title">Home</h1>
    </Layout>    
  );
}

export default Home;
