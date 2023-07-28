import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'
import Store from './Redux/_stores'
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={Store}>
    <BrowserRouter>
   <App />
    </BrowserRouter>
   </Provider>


  </React.StrictMode>
);