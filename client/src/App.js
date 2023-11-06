import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyDoctor from "./pages/ApplyDoctor";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Notifications from "./pages/Notifications";
import UsersList from "./pages/Admin/UsersList";
import DoctorsList from "./pages/Admin/DoctorsList";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status">            
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route exact path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route exact path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route exact path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route exact path="/admin/userslist" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route exact path="/admin/doctorslist" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
      </Routes>
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;
