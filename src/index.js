import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
