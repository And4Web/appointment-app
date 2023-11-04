import React, { useEffect, useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const userState = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");
  const [unseenNotifications, setUnseeNotifications] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  let userFirstName = user.split(" ")[0];

  useEffect(() => {
    if (userState) {
      setUser(userState.name);
      setIsAdmin(userState.isAdmin);
      setUnseeNotifications(userState.unseenNotifications);
    }
  }, [userState]);

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-list-check",
    },
    {
      name: "Apply doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-team-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-user-heart-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];

  const menuToBe = isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
          <div className="sidebar-header">
            <h1 className="site-logo">AH</h1>
          </div>
          <div className="sidebar-menu">
            {menuToBe.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex ${
                    !collapsed ? "menu-item" : "collapsed-menu-item"
                  } ${isActive && "active-menu-item"}`}
                  key={index}
                  onClick={() => navigate(`${menu.path}`)}
                >
                  <i className={menu.icon}></i>
                  {!collapsed ? <Link to={menu.path}>{menu.name}</Link> : null}
                </div>
              );
            })}
            <div
              className={`d-flex ${
                !collapsed ? "menu-item" : "collapsed-menu-item"
              } "active-menu-item"`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed ? <Link to="/logout">Logout</Link> : null}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-3 py-3 header-right">
              <div className="notification ">
                <Badge size="default" count={unseenNotifications.length} className="notification-badge" onClick={()=> navigate("/notifications")}>
                  <i className="ri-notification-line header-action-icon px-3 notification-bell"></i>
                </Badge>
              </div>
              <Link to="/profile" className="header-user mx-2">
                {userFirstName}
              </Link>
            </div>
          </div>
          <div className="content-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
