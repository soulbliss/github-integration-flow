import "./SignUpForm.scss";
import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { register as SignUpUser } from "../../../src/api/authApi";
import VerificationModal from "./VerificationModal";
import { Link } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "../icons/Icons";
const { Option } = Select;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "This field is required",
  types: {
    email: "Please enter a valid mail",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};
/* eslint-enable no-template-curly-in-string */

const SignUpForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFormSubmit = async values => {
    SignUpUser(values).then(data => {
      if (data.status === 200) {
        setIsModalOpen(true);
      }
    });
  };
  return (
    <div className="sign-up-form">
      <div className="title">Create an account</div>
      <div className="sub-title">
        Already have an account?{" "}
        <span className="link">
          {" "}
          <Link to="/signin">Sign in</Link>
        </span>
      </div>
      <Form
        name="nest-messages"
        onFinish={onFormSubmit}
        initialValues={{
          prefix: "91"
        }}
        style={{
          maxWidth: 600
        }}
        validateMessages={validateMessages}>
        <div>
          <Form.Item
            name="name"
            placeholder="Please input"
            rules={[
              {
                required: true
              }
            ]}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email"
              }
            ]}>
            <Input placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="organization"
            placeholder="Please input"
            rules={[
              {
                required: true
              }
            ]}>
            <Input placeholder="Organization name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}>
            <Input.Password
              iconRender={visible =>
                visible ? (
                  <div onClick={() => setPasswordVisible(prevState => !prevState)}>
                    <EyeOutlined />
                  </div>
                ) : (
                  <div onClick={() => setPasswordVisible(prevState => !prevState)}>
                    <EyeInvisibleOutlined />
                  </div>
                )
              }
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible
              }}
              placeholder="Password"
            />
          </Form.Item>
          <div className="info-text">Password must be at least 8 characters</div>
          <div className="info-text">
            By clicking Sign Up you are indicating that you have read and acknowledged the <Link to="#">Terms of Service</Link> and{" "}
            <Link to="#">Privacy Notice</Link>
          </div>
        </div>
        <Form.Item>
          <Button className="button" type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <VerificationModal handleOk={handleOk} isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default SignUpForm;
