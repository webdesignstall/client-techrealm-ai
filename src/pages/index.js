import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";
import { Card, Col, Row } from "antd";
import ProjectForm from "@/components/Project/ProjectForm";

export default function Home({ countries, subjects, qualifications, general }) {
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
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
