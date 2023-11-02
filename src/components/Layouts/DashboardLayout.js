import React from "react";
import { Button, Layout, Space, theme } from "antd";
import WithAuth from "@/middleware/WithAuth";
import { useSelector } from "react-redux";
import Head from "next/head";
import { logOut } from "@/utilities/sessionHelper";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/*<SideBarMenu />*/}
        <Layout>
          <Header
            style={{
              padding: "10px 20px",
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="container"
            >
              <div className="app-logo">
                <Link href="/">LOGO</Link>
              </div>
              <Space size="middle">
                <p>
                  Welcome To{" "}
                  <span
                    style={{
                      color: "green",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >{`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}</span>
                </p>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <Button onClick={logOut}>Log Out</Button>
              </Space>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "100vh",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default WithAuth(DashboardLayout);
