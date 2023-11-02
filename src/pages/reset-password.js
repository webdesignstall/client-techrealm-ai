import React, { useState } from "react";
import {
  KeyOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
import handleRequest from "@/utilities/handleRequest";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values) => {
    values.email = localStorage.getItem("otpEmail");
    values.otp = localStorage.getItem("verifyOtp");
    setLoading(true);
    const result = await handleRequest("patch", `/passwords`, values);
    if (result.success) {
      localStorage.removeItem("otpEmail");
      localStorage.removeItem("verifyOtp");
      localStorage.removeItem("otpExpireTime");
      await router.push("/");
    }
    setLoading(false);
  };
  return (
    <AuthFromWrapper formName="Reset Password">
      <Form
        id="components-form-demo-normal-login"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input Password!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input Confirm Password!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Reset Now
          </Button>
          Or <Link href="/login">Login</Link>
        </Form.Item>
      </Form>
    </AuthFromWrapper>
  );
};
export default LoginPage;
