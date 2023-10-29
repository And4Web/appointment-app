import React, {useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)

  const getUser = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post("http://localhost:5000/api/user/get-user-info-by-id", {token: localStorage.getItem("token")}, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      dispatch(hideLoading())
      if(response.data.success){   
        dispatch(setUser(response.data.loggedinUser.name))
      }else{
        localStorage.clear();
        navigate("/login")
      }      
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      navigate("/login")
    }
  }

  useEffect(()=>{
    let effect = () => {
      if(!user.loggedinUser){
        getUser();
      } 
    }     
   effect()
  },[user.loggedinUser])

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
