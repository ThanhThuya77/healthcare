import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.scss';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store/Context';

axios.defaults.baseURL = `//localhost:5000`;

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function async(error) {
    return Promise.reject(error.response?.data);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
