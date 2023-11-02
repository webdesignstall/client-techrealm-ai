import React from "react";
import ProjectForm from "@/components/Project/ProjectForm";
import { Card, Col, Row } from "antd";
import RootLayout from "@/components/Layouts/RootLayout";

const AddNewProject = () => {
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Card>
            <ProjectForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddNewProject;

AddNewProject.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
