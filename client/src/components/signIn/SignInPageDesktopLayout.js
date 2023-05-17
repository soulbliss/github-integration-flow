import React from "react";
import { Col, Row } from "antd";
import SidePanel from "../sidePanel/SidePanel";
import SignInForm from "./SignInForm";

const SignInPageDesktopLayout = () => {
  return (
    <Row className="sign-up-page-wrapper">
      <Col className="side-panel-holder" span={9}>
        <SidePanel />
      </Col>
      <Col span={15}>
        <div className="form-holder">
          <SignInForm />
        </div>
      </Col>
    </Row>
  );
};

export default SignInPageDesktopLayout;
