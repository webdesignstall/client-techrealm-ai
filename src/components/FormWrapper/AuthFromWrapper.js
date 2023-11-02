import React from "react";
import { Card, Col, Row } from "antd";

const AuthFromWrapper = ({ children, formName }) => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={12}>
        <Card title={<h2 style={{ textAlign: "center" }}>{formName}</h2>}>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default AuthFromWrapper;
