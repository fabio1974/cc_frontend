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
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalBody, Spinner } from "reactstrap";
import LoadingModal from "./components/LoadingModal";
import LoadingContext from "./context/LoadingContext";
import ClienteForm from "./pages/ClienteForm";
import Pesquisa from "./pages/Pesquisa";
import BoletoAvulso from "./pages/BoletoAvulso";
import PesquisaCliente from "./pages/PesquisaCliente";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [loadingObj, setLoadingObj] = React.useState({
    loading: false,
    loadingMessage: "eu meu fi...",
  });

  const showMessage = (message) => {
    setLoadingObj({ loading: true, loadingMessage: message });
  };

  const closeMessage = () => {
    setLoadingObj({ loading: false });
  };

  return (
    <LoadingContext.Provider value={{ showMessage, closeMessage }}>
      <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <main className={showSidebar ? "content active" : "content"}>
        <ToastContainer />
        <LoadingModal
          isOpen={loadingObj.loading}
          message={loadingObj.loadingMessage}
        />

        <Routes>
          <Route
            path="/"
            element={<Pesquisa setShowSidebar={setShowSidebar} />}
          />
          <Route
            path="/home"
            element={<Pesquisa setShowSidebar={setShowSidebar} />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/boleto"
            element={<BoletoList setShowSidebar={setShowSidebar} />}
          />
          <Route
            path="/boletoAvulso"
            element={<BoletoAvulso setShowSidebar={setShowSidebar} />}
          />

          <Route
            path="/pesquisaCliente"
            element={<PesquisaCliente setShowSidebar={setShowSidebar} />}
          />
        </Routes>
      </main>

      <Footer toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
    </LoadingContext.Provider>
  );
}

export default App;
