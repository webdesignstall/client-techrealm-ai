import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import ProjectForm from "@/components/Project/ProjectForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import handleRequest from "@/utilities/handleRequest";
import ProjectCard from "@/components/Project/ProjectCard";
import Link from "next/link";

export default function Home() {
  const { currentUser } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  if (currentUser) {
    router.push("/dashboard");
  }

  useEffect(() => {
    (async () => {
      const ids = localStorage.getItem("projectIds");
      if (ids) {
        const result = await handleRequest("get", `projects-byids/${ids}`);
        setProjects(result?.data);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Tech RealM AI</title>
      </Head>

      <div className="container" style={{ marginTop: "5rem" }}>
        <Row>
          <Col span={18} offset={4}>
            <Card>
              <ProjectForm />
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "5rem" }}>
          <div style={{ margin: "10px 0px" }}>
            <Link href="/register">Continue To Dashboard</Link>
          </div>

          <Row gutter={[18, 18]}>
            {projects?.map((project) => (
              <Col key={project?._id} span={8}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
