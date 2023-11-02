import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import handleRequest from "@/utilities/handleRequest";

const { Option } = Select;
const ProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.auth);

  const onFinish = async (value) => {
    if (currentUser) {
      value.userId = currentUser?.id;
    }
    setLoading(true);
    const result = await handleRequest("post", "projects", value);
    setLoading(false);
    if (!currentUser) {
      const storedIds = JSON.parse(localStorage.getItem("projectIds")) || [];

      // Add the new ID to the array
      storedIds.push(result?.data._id);

      // Store the updated array back in localStorage
      localStorage.setItem("projectIds", JSON.stringify(storedIds));
    }
    router.push(`/project/${result?.data?.link}`);
    // router.push(`/dashboard`);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please input your project name!",
            },
          ]}
        >
          <Input size="large" placeholder="Project name" />
        </Form.Item>

        <Form.Item
          name="prompt"
          label="Description / Prompt"
          rules={[
            {
              required: true,
              message: "Please input your project Description / Prompt!",
            },
          ]}
        >
          <Input.TextArea
            size="large"
            placeholder="Project description / prompt"
          />
        </Form.Item>

        <Form.Item
          name="projectType"
          label="What type of project do you have?"
          rules={[
            {
              required: true,
              message: "Please select your project type!",
            },
          ]}
        >
          <Select size="large" placeholder="Please select a project type">
            <Option value="ecommerce">Ecommerce</Option>
            <Option value="landingPage">Landing Page</Option>
            <Option value="softwareasaservicepage">
              Software as a service page
            </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Generate Now
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectForm;
