import React,{useState} from 'react'
import '../layout.css'
import { Link, useLocation } from 'react-router-dom'

function Layout({children}) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

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
            
            </div>
            <div className="content-body">{children}</div>
          </div>
        </div>
      </div>
    
  )
}

export default Layout