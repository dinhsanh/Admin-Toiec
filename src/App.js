import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './page/LoginPage/LoginPage';
import Register from './page/Register/Register'
import LayoutPage from './Layout/LayoutPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn])

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {isLoggedIn ? (<LayoutPage />) : null}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
