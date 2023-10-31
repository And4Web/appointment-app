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

function App() {
  const { loading } = useSelector((state) => state.alerts);
  // console.log("loading from App.js: ", loading)

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
      </Routes>
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;
