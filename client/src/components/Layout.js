import React,{useEffect, useState} from 'react'
import '../layout.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';

function Layout({children}) {
  const userState = useSelector(state=>state.user.user);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");
  
  let userFirstName = user.split(" ")[0];

  useEffect(()=>{
    if(userState){
      setUser(userState);
    }
  },[userState])
  

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line"
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-list-check"
    },
    {
      name: "Apply doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line"
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-circle-line"
    },
  ]
  
  return (    
      <div className="main">
        <div className="d-flex layout">
          <div className={collapsed ? "collapsed-sidebar":"sidebar"}>
            <div className="sidebar-header">
              <h1>AH</h1>
            </div>
            <div className="sidebar-menu">
              {userMenu.map((menu, index)=>{
                const isActive = location.pathname === menu.path;
                return(
                  <div className={`d-flex ${!collapsed? "menu-item" : "collapsed-menu-item"} ${isActive && "active-menu-item"}`} key={index}>
                    <i className={menu.icon} ></i>
                    {!collapsed ? (<Link to={menu.path}>{menu.name}</Link>) : null}                    
                  </div>
                )
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">
              {collapsed? (<i className="ri-menu-2-line header-action-icon" onClick={()=>setCollapsed(false)}></i>) : (<i className="ri-close-line header-action-icon" onClick={()=>setCollapsed(true)}></i>)}   
              <div className="d-flex align-items-center px-3 header-right"><i className="ri-notification-line header-action-icon px-3" ></i>
              <Link to="/profile" className='header-user'>{userFirstName}</Link>
              </div>        
            </div>
            <div className="content-body">{children}</div>
          </div>
        </div>
      </div>
    
  )
}

export default Layout