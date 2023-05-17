import React from "react";
import TopPanel from "../topPanel/TopPanel";
import SignInForm from "./SignInForm";
import "./SignInPageMobileLayout.scss";

const SignInPageMobileLayout = () => {
  return (
    <div className="sign-up-page-wrapper">
      <div className="side-panel-holder">
        <TopPanel />
      </div>
      <div className="sign-in-form-mobile">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPageMobileLayout;
