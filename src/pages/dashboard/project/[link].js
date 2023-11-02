import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Flex, Tag, Typography } from "antd";
import handleRequest from "@/utilities/handleRequest";
import RootLayout from "@/components/Layouts/RootLayout";

const singleProject = {
  projectName: "Project 3",
  prompt:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n" +
    "molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n" +
    "numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n" +
    "optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n" +
    "obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n" +
    "nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n" +
    "tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n" +
    "quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos \n" +
    "sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam\n" +
    "recusandae alias error harum maxime adipisci amet laborum. Perspiciatis \n" +
    "minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit \n" +
    "quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur \n" +
    "fugiat, temporibus enim commodi iusto libero magni deleniti quod quam \n" +
    "consequuntur! Commodi minima excepturi repudiandae velit hic maxime\n" +
    "doloremque. Quaerat provident commodi consectetur veniam similique ad \n" +
    "earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo \n" +
    "fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore \n" +
    "suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium\n" +
    "modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam \n" +
    "totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam \n" +
    "quasi aliquam eligendi, placeat qui corporis!",
  projectType: "softwareasaservicepage",
  link: "link3",
  image:
    "https://elements-cover-images-0.imgix.net/7a410991-3174-4e2a-90ec-ed3ffb16cff0?auto=compress&crop=edges&fit=crop&fm=jpeg&h=630&w=1200&s=76e76c2840f5a18a196f1c4cc808890a",
};

const cardStyle = {
  width: 620,
};
const imgStyle = {
  display: "block",
  width: 635,
  height: 300,
};
const SingleProject = () => {
  const params = useSearchParams();
  const projectLink = params.get("link");
  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", `project/${projectLink}`);
      console.log(result);
    })();
  }, [projectLink]);

  return (
    <div className="container">
      <Card>
        <Flex justify="space-between">
          <img alt="avatar" src={singleProject.image} style={imgStyle} />
          <Flex
            vertical
            justify="space-between"
            style={{
              padding: 32,
            }}
          >
            <Tag
              style={{ display: "inline", fontSize: "18px", padding: "10px" }}
            >
              {singleProject.projectType}
            </Tag>
            <Typography.Title style={{ marginTop: "10px" }} level={3}>
              {singleProject.projectName}
            </Typography.Title>
            <p
              style={{
                textDecoration: "underline",
                marginTop: "10px",
                color: "blue",
              }}
            >
              {singleProject.link}
            </p>
            <p style={{ marginTop: "10px", textAlign: "justify" }}>
              {singleProject.prompt}
            </p>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default SingleProject;

SingleProject.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
