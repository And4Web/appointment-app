import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status">            
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
