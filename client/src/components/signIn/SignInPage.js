import React from "react";
import Utils from "../../_helpers/Utils";
import SignInPageDesktopLayout from "./SignInPageDesktopLayout";
import SignInPageMobileLayout from "./SignInPageMobileLayout";
import "../signUp/SignUpPage.scss";
const SignInPage = () => {
  return (
    <div className="sign-up-page">
      {Utils.isMobile() ? <SignInPageMobileLayout /> : <SignInPageDesktopLayout />}
    </div>
  );
};

export default SignInPage;
