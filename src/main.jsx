import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";
import "./styles/reset.css";
import "./styles/theme.css";
import {Provider} from "react-redux";
import {store} from "./store/store";


import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store ={store}>
       <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);