import { Flex, Layout, Space } from "antd";
import Head from "next/head";
import Link from "next/link";
import store from "@/redux/store";

const { Header, Content, Footer } = Layout;

const RootLayout = ({ children }) => {
  const { currentUser } = store.getState().auth;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*<link
          rel="icon"
          href={general?.favicon?.secure_url || "./favicon.png"}
        />*/}
        <link
          href="https://www.dafontfree.net/embed/Z290aGFtLWJsYWNrJmRhdGEvNDYvZy82Mzg2MS9Hb3RoYW0tQmxhY2sub3Rm"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Layout>
        <Header className="container" style={{ background: "none" }}>
          <Flex className="header-nav" justify="space-between" align="center">
            <div className="app-logo">
              <Link href="/">LOGO</Link>
            </div>
            <div className="nav-item">
              <Space size="middle">
                {currentUser ? (
                  <Link href="/dashboard">Dashboard</Link>
                ) : (
                  <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                  </>
                )}
              </Space>
            </div>
          </Flex>
        </Header>
        <Content style={{ height: "90vh", background: "none" }}>
          <div className="container">{children}</div>
        </Content>
      </Layout>
    </>
  );
};

export default RootLayout;
