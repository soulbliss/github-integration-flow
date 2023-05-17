import React from "react";
import { Col } from "antd";
import TopPanel from "../topPanel/TopPanel";
import SignInForm from "./SignInForm";

const SignInPageMobileLayout = () => {
  return (
    <div className="sign-up-page-wrapper">
      <Col className="side-panel-holder" span={24}>
        <TopPanel />
      </Col>
      <Col className="side-panel-holder" offset={1} span={20}>
      <SignInForm />
       </Col>
    </div>
  );
};

export default SignInPageMobileLayout;
