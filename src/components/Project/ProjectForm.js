import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;
const ProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (value) => {};

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
