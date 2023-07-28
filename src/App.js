import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom';
import Footer from './page/Footer/Footer';
import LoginPage from './page/LoginPage/LoginPage';
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
    <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        {isLoggedIn ? (<LayoutPage />) : null}  
    </div>
    
  );
}

export default App;
