import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import BoletoList from "./pages/BoletoList";
import ClienteList from "./pages/ClienteList";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import React, { useState } from "react";
import Footer from "./layout/Footer";
import BoletoForm from "./pages/BoletoForm";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log("sidebar", showSidebar);
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <main className={showSidebar ? "content active" : "content"}>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cliente" element={<ClienteList />} />
          <Route path="/boleto" element={<BoletoList />} />
          <Route path="/boletoForm" element={<BoletoForm />} />
        </Routes>
      </main>

      <Footer toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
    </div>
  );
}

export default App;
