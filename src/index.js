import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./context/UserContext";
import { UserDataProvider } from "./context/UserDataContext";
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<BrowserRouter>
  <CurrentUserProvider>
    <UserDataProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserDataProvider>
  </CurrentUserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
