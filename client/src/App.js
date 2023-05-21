import "./App.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./components/signUp/SignUpPage";
import SignInPage from "./components/signIn/SignInPage";
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoute from "../src/_helpers/PrivateRoute";

import EmailVerificationPage from "./components/emailVerify/EmailVerificationPage";
import { history } from "./_helpers/history";

function App() {
  return (
    <div className="App">
      <Routes history={history}>
        <Route path="/">
          <Route index element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="verify-email" element={<EmailVerificationPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
