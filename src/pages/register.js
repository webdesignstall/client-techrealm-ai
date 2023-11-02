import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import handleRequest from "@/utilities/handleRequest";
import { setAuth } from "@/redux/slice/auth-slice";
import store from "@/redux/store";
import { setToken } from "@/utilities/sessionHelper";
import RootLayout from "@/components/Layouts/RootLayout";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const router = useRouter();
  if (currentUser) {
    router.push("/dashboard");
  }

  const onFinish = async (values) => {
    const projectIds = JSON.parse(localStorage.getItem("projectIds"));

    setLoading(true);
    const result = await handleRequest("post", "/register", values);
    setLoading(false);

    if (result?.data?.id && projectIds?.length) {
      await handleRequest("patch", "/projects-update", {
        userId: result?.data?.id,
        ids: projectIds,
      });
      localStorage.removeItem("projectIds");
    }
    if (result.success) {
      store.dispatch(setAuth(result?.data?.accessToken));
      setToken(result?.data?.accessToken);
      window.location.href = "/dashboard";
    }
  };

  return (
    <div>
      <AuthFromWrapper formName="Register">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.List name="name">
            {(fields) => (
              <>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      style={{ width: "100%" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="first name"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      style={{ width: "100%" }}
                    >
                      <Input size="large" placeholder="last name" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input size="large" placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            Already have an account?
            <Link href="/login" style={{ color: "green", marginLeft: "5px" }}>
              Login
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </AuthFromWrapper>
    </div>
  );
};
export default RegisterPage;

RegisterPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
