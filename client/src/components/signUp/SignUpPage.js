import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import { Col, Row } from "antd";
import "./SignUpPage.scss";
const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <Row className="sign-up-page-wrapper">
        <Col className="side-panel-holder" span={9}>
          <SidePanel />
        </Col>
        <Col span={15}>
          <div>I am signUpPage</div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
