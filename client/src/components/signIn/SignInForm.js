import React from "react";
import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
const onFinish = values => {
  console.log(values);
};

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
const SignInForm = () => {
  return (
    <div className="sign-up-form">
      <div className="title">Sign In to WisdomCircle</div>
      <div className="sub-title">
        Don't have an account?{" "}
        <span className="link">
          {" "}
          <Link to="/signup">Sign up</Link>
        </span>
      </div>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          prefix: "91"
        }}
        style={{
          maxWidth: 600
        }}
        validateMessages={validateMessages}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email"
            }
          ]}>
          <Input placeholder="Email or Mobile Number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="action-item">Forgot Password</div>
        <Form.Item>
          <Button className="button" type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
