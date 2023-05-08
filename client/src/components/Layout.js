import React from 'react'
import '../layout.css'
import { Link, useLocation } from 'react-router-dom'

function Layout({children}) {
  const location = useLocation();

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
          <div className="sidebar">
            <div className="sidebar-header">
              <h1>AH</h1>
            </div>
            <div className="sidebar-menu">
              {userMenu.map(menu=>{
                const isActive = location.pathname === menu.path;
                return(
                  <div className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="content-body">{children}</div>
          </div>
        </div>
      </div>
    
  )
}

export default Layout