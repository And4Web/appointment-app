import React, {useEffect} from "react";
import axios from "axios";

import Layout from "../components/Layout";

import {useSelector, useDispatch} from 'react-redux';

function Home() {
  const loading = useSelector(state=>state.alerts);
  // console.log("Loading Home.js: ", loading);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/get-user-info-by-id", {}, {
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
      <h1 className="home-title">Home</h1>
    </Layout>    
  );
}

export default Home;
