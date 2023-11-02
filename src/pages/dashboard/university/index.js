import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space, Upload } from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import Head from "next/head";

const CourseUniversity = () => {
  const [rerender, setRerender] = useState(0);
  const [deletingID, setDeletingID] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [subjectId, setIsUniversityId] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("ranking", values.ranking);
    formData.append("country", values.country);
    formData.append("logo", fileList[0]?.originFileObj || {});

    setLoading(true);
    const result = await handleRequest(
      values.id ? "patch" : "post",
      values.id ? `/universities/${values.id}` : "/universities",
      formData,
      { "Content-Type": "multipart/form-data" },
    );

    if (result.success) {
      setRerender(rerender + 1);
      form.resetFields();
      setIsUniversityId("");
      setFileList([]);
    }
    setLoading(false);
  };

  const deleteHandler = async (id, name) => {
    setDeletingID(id);
    const isConfirm = window.confirm(
      "Are you sure delete - " + name?.toUpperCase() + " - university",
    );
    if (isConfirm) {
      setIsDeleting(true);
      await handleRequest("delete", `universities/${id}`);
      setIsDeleting(false);
      setRerender(rerender + 1);
    }
  };
  const updateHandler = async (id) => {
    setIsUniversityId(id);
    const result = await handleRequest("get", `universities/${id}`);
    if (result.success) {
      form.setFieldsValue(result?.data);
      const photo = result.data?.logo?.secure_url
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: result.data?.logo?.secure_url,
            },
          ]
        : [];
      setFileList(photo);
    }
  };
  const onReset = () => {
    form.resetFields();
    setIsUniversityId("");
    setFileList([]);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const columns = [
    {
      title: "University Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (urls, item) => {
        return <img width={180} src={urls?.secure_url} alt={item?.name} />;
      },
    },
    {
      title: "Ranking",
      dataIndex: "ranking",
      key: "ranking",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value, _) => moment(value).format("LL"),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value, _) => moment(value).format("LL"),
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, data) => {
        if (data.name !== "super_admin") {
          return (
            <Space wrap key={id}>
              <Button
                type={"primary"}
                style={{ background: "forestgreen" }}
                onClick={() => updateHandler(id)}
              >
                <EditOutlined />
              </Button>
              <Button
                loading={id === deletingID ? isDeleting : false}
                disabled={isDeleting}
                type={"primary"}
                style={{ background: "darkorange" }}
                onClick={() => deleteHandler(id, data.name)}
              >
                {id === deletingID && isDeleting ? "" : <DeleteOutlined />}
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <>
      <Head>
        <title> University List | Dashboard</title>
      </Head>
      <Row gutter={32}>
        <Col span={16}>
          <SharedTable
            tableName="Course University"
            tableColumn={columns}
            url={"universities"}
            RightElement={<></>}
            rerender={rerender}
            scroll={{ x: 1200 }}
          />
        </Col>
        <Col span={8}>
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="University Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "University name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Ranking" name="ranking">
                <Input />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input />
              </Form.Item>
              <Form.Item label="" name="logo" style={{ width: "100%" }}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 1 && "Logo"}
                </Upload>
              </Form.Item>
              <Form.Item hidden name="id">
                <Input />
              </Form.Item>
              <Form.Item>
                <Space size={6}>
                  <Button loading={loading} type="primary" htmlType="submit">
                    {subjectId ? "Update" : "Create"}
                  </Button>
                  <Button onClick={() => onReset()} htmlType="button">
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CourseUniversity;

CourseUniversity.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
