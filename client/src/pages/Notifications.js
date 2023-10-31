import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const navigate = useNavigate();
  const userState = useSelector(state=>state.user.user);
  const [unseenNotifications, setUnseenNotifications] = useState([]);

  useEffect(()=>{
    if(userState){
      setUnseenNotifications(userState.unseenNotifications);
    }
  },[userState])
  
  console.log('Notifications.js: ', unseenNotifications);
  // console.log(userState)

  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>
      {/* <hr/> */}
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end"><h6 className='anchor'>Mark all as read</h6></div>
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
        <div className="d-flex justify-content-end"><h6 className='anchor'>Delete all</h6></div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default Notifications

// from 10:00