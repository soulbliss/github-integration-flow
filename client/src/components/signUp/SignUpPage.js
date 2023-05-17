import React from "react";
import Utils from "../../_helpers/Utils";
import SignUpPageDesktopLayout from "./SignUpPageDesktopLayout";
import SignUpPageMobileLayout from "./SignUpPageMobileLayout";

import "./SignUpPage.scss";
const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      {Utils.isMobile() ? <SignUpPageMobileLayout /> : <SignUpPageDesktopLayout />}
    </div>
  );
};

export default SignUpPage;
