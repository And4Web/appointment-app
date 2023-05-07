import React, {useEffect} from "react";
import axios from "axios";

function Home() {

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
    <div className="home">
      <h1 className="home-title">Home</h1>
    </div>
  );
}

export default Home;
