import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import axios from 'axios';
// import Context from './pages/Context';

axios.defaults.baseURL = "http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Context> */}
      <App />
    {/* </Context> */}
  </React.StrictMode>
);
