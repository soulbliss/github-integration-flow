import React from 'react';
import TopPanel from "../topPanel/TopPanel";
import SignUpForm from "./SignUpForm";

const SignUpPageMobileLayout = () => {
  return (
    <div className="sign-up-page-wrapper">
      <div className="side-panel-holder">
        <TopPanel />
      </div>
      <div className="sign-in-form-mobile">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPageMobileLayout;