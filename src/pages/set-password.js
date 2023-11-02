import React, { useState } from "react";
import { KeyOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import handleRequest from "@/utilities/handleRequest";
const LoginPage = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values) => {
    values.token = params.get("token");
    setLoading(true);
    const result = await handleRequest("post", "/passwords", values);
    setLoading(false);
    if (result.success) {
      router.push("/login");
    }
  };
  return (
    <AuthFromWrapper formName="Set Password">
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
            Set Now
          </Button>
        </Form.Item>
      </Form>
    </AuthFromWrapper>
  );
};
export default LoginPage;
