import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {showLoading, hideLoading} from '../redux/alertsSlice';
import axios from 'axios';
import {toast} from 'react-hot-toast';
// import {} from '../redux/userSlice';

function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(state=>state.user.user);
  const [userId, setUserId] = useState(null);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);

  useEffect(()=>{
    if(userState){      
      setUnseenNotifications(userState.unseenNotifications);
      setSeenNotifications(userState.seenNotifications);
    }  
    if(userState && !userId){
      setUserId(userState._id)
    }
  },[userState])
  
  // console.log('Notifications.js, unseenNotifications: ',unseenNotifications);
  // console.log("Notification.js, user: ", userId)

  const markAllAsSeen = async (values) => {
    try {
      dispatch(showLoading)
      const response = await axios.post("http://localhost:5000/api/user/mark-all-notifications-as-seen", {userId}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading);

      if(response.data.success){
        toast.success(response.data.message);
        setUnseenNotifications(response.data.unseenNotifications? []: [])
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error.message)
      toast.error("Something went wrong.")
    }
    
  }


  const deleteAllNotifications = async (values) => {
    try {
      dispatch(showLoading)
      const response = await axios.post("http://localhost:5000/api/user/delete-all-notifications", {userId}, {headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }})
    dispatch(hideLoading)
    if(response.data.success){
      toast.success(response.data.message)
      setSeenNotifications(response.data.seenNotifications? []: [])
    }else{
      toast.error(response.data.message)
    }
    } catch (error) {
      dispatch(hideLoading)
      console.log(error.message)
      toast.error(error.message)      
    }
    
  }

  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>
    
      {/* <hr/> */}
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end" onClick={()=>markAllAsSeen()}><h6 className='anchor'>Mark all as seen</h6></div>
          {
            unseenNotifications.map(item=>{
              const {type, onClickPath, message} = item;
              return(
              <div className='card p-2' onClick={()=>navigate(onClickPath)}>
                <div className="card-text notification-text">
                  <h6>{type.toUpperCase()}</h6>{message}
                </div>
              </div>
            )})
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
        <div className="d-flex justify-content-end" onClick={()=>deleteAllNotifications()}><h6 className='anchor'>Delete all</h6></div>
        {
            seenNotifications.map(item=>{
              const {type, onClickPath, message} = item;
              return(
              <div className='card p-2' onClick={()=>navigate(onClickPath)}>
                <div className="card-text notification-text">
                  <h6>{type.toUpperCase()}</h6>{message}
                </div>
              </div>
            )})
          }
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default Notifications

// from 10:00