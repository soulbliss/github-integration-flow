import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import SignInForm from "./SignInForm";
import { Col, Row } from "antd";
import "../signUp/SignUpPage.scss";
const SignInPage = () => {
  return (
    <div className="sign-up-page">
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
    </div>
  );
};

export default SignInPage;
