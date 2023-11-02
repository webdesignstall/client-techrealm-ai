import Head from "next/head";
import { Button, Col, Flex, Row } from "antd";
import Link from "next/link";
import ProjectCard from "@/components/Project/ProjectCard";
import { useEffect, useState } from "react";
import handleRequest from "@/utilities/handleRequest";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", "projects");
      setProjects(result?.data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container">
        <Flex justify="space-between">
          <span></span>
          <Link href="/dashboard/project">
            <Button size="large" type="default">
              Add New
            </Button>
          </Link>
        </Flex>

        <div style={{ marginTop: "5rem" }}>
          <Row gutter={[18, 18]}>
            {projects?.map((project) => (
              <Col span={8}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
