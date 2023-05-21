import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../../src/api/authApi";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CheckSuccessIcon, CloseIcon, EyeOutlined, EyeInvisibleOutlined } from "../icons/Icons";

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
let defaultErrorValues = { field: "" };
const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(defaultErrorValues);
  const [notificationApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = placement => {
    notificationApi.success({
      message: `You are successfully logged in`,
      placement,
      closeIcon: <CloseIcon />,
      icon: <CheckSuccessIcon />
    });
  };
  const onFinish = values => {
    login(values)
      .then(response => {
        if (response.user.email) {
          setError(defaultErrorValues);
          openNotification("topRight");
          navigate("/dashboard");
        }
      })
      .catch(({ errors }) => {
        setError(errors);
      });
  };
  return (
    <div className="sign-up-form">
      {contextHolder}
      <div className="title">Sign In to Humalect</div>
      <div className="sub-title">
        Don't have an account?{" "}
        <span className="link">
          <Link to="/signup">Sign up</Link>
        </span>
      </div>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        className="sign-in-form"
        initialValues={{
          prefix: "91"
        }}
        style={{
          maxWidth: 600
        }}
        validateMessages={validateMessages}>
        <div className="ant-form-items">
          <Form.Item
            name="email"
            rules={[
              {
                type: "email"
              }
            ]}
            validateStatus={error.field === "email" ? "error" : ""}
            help={error.field === "email" ? error.message : ""}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            validateStatus={error.field === "password" ? "error" : ""}
            help={error.field === "password" ? error.message : ""}>
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
          <div className="action-item">Forgot Password</div>
        </div>
        <Form.Item>
          <Button className="button absolute" type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
