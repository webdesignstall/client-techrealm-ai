import React from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ProjectForm from "@/components/Project/ProjectForm";
import { Card, Col, Row } from "antd";

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
  return <DashboardLayout>{page}</DashboardLayout>;
};
