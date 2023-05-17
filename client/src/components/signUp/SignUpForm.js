import "./SignUpForm.scss";
import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
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

const onFinish = values => {
  console.log(values);
};
const SignUpForm = () => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 88
        }}>
        <Option value="91">+91</Option>
        <Option value="01">+01</Option>
      </Select>
    </Form.Item>
  );
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
        onFinish={onFinish}
        initialValues={{
          prefix: "91"
        }}
        style={{
          maxWidth: 600
        }}
        validateMessages={validateMessages}>
        <Form.Item
          name="firstName"
          placeholder="Please input"
          rules={[
            {
              required: true
            }
          ]}>
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          placeholder="Please input"
          rules={[
            {
              required: true
            }
          ]}>
          <Input placeholder="Last Name" />
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
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!"
            }
          ]}>
          <Input
            addonBefore={prefixSelector}
            placeholder="Mobile Number"
            style={{
              width: "100%"
            }}
          />
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
        <div className="info-text">Password must be at least 8 characters</div>
        <div className="info-text">
          By clicking Sign Up you are indicating that you have read and acknowledged the <Link to="#">Terms of Service</Link> and{" "}
          <Link to="#">Privacy Notice</Link>
        </div>
        <Form.Item>
          <Button className="button" type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;