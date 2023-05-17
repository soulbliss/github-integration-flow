import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import SignUpForm from "./SignUpForm";
import { Col, Row } from "antd";

const SignUpPageDesktopLayout = () => {
  return (
    <Row className="sign-up-page-wrapper">
      <Col className="side-panel-holder" span={9}>
        <SidePanel />
      </Col>
      <Col span={15}>
        <div className="form-holder">
          <SignUpForm />
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPageDesktopLayout;
