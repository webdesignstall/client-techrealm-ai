import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Space,
  Statistic,
} from "antd";
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
import handleRequest from "@/utilities/handleRequest";
import { useRouter } from "next/navigation";

const { Countdown } = Statistic;

const OTPVerifyPage = () => {
  const [isOtpExpire, setIsOtpExpire] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [otpExpireTime, setOtpExpireTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOtpExpireTime(localStorage.getItem("otpExpireTime"));
    }
  }, []);

  const onFinish = async (values) => {
    const email = localStorage.getItem("otpEmail");
    setIsSubmit(true);
    const result = await handleRequest("get", `/otp/${email}/${values?.otp}`);
    setIsSubmit(false);
    if (result.success) {
      setIsOtpExpire(true);
      localStorage.setItem("verifyOtp", values?.otp);
      await router.push("/reset-password");
    }
  };

  const handleOtpExpire = () => {
    setIsOtpExpire(true);
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("otpEmail");
    setLoading(true);
    const result = await handleRequest("get", `/resend-otp/${email}`);
    if (result.success) {
      localStorage.setItem("otpExpireTime", result.data);
      localStorage.setItem("otpEmail", email);
      setOtpExpireTime(result.data);
      setIsOtpExpire(false);
    }
    setLoading(false);
  };
  const deadlineDate = new Date(otpExpireTime);

  return (
    <AuthFromWrapper formName="OTP Verify">
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
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP!",
            },
          ]}
          style={{ padding: "0px!important", margin: 0, marginBottom: "5px" }}
        >
          <Input size="large" placeholder="OTP" />
        </Form.Item>
        <div style={{ marginBottom: "10px", padding: 0 }}>
          {isOtpExpire ? (
            <Button
              loading={loading}
              onClick={handleResendOTP}
              style={{ color: "green" }}
            >
              Resend OTP
            </Button>
          ) : (
            <>
              <Space>
                {" "}
                Expire In:{" "}
                <Countdown
                  format={"mm:ss"}
                  value={deadlineDate}
                  onFinish={handleOtpExpire}
                />{" "}
              </Space>
            </>
          )}
        </div>

        <Form.Item>
          <Button
            loading={isSubmit}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Next
          </Button>
          Or <Link href="/login">Login</Link>
        </Form.Item>
      </Form>
    </AuthFromWrapper>
  );
};
export default OTPVerifyPage;
