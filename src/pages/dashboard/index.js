import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Head from "next/head";
import { Button, Col, Flex, Row } from "antd";
import Link from "next/link";
import ProjectCard from "@/components/Project/ProjectCard";

const projects = [
  {
    projectName: "Project 1",
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
    projectType: "ecommerce",
    link: "link1",
    image:
      "https://www.cloudways.com/blog/wp-content/uploads/ecommerce-best-practices-.jpg",
  },
  {
    projectName: "Project 2",
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
    projectType: "landingPage",
    link: "link2",
    image:
      "https://assets-global.website-files.com/5b5729421aca332c60585f78/63f5fa23da820b87c87958be_61ba503872080311dde1ea56_long-form-landing-page-examples.png",
  },

  {
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
  },
];

const Dashboard = () => {
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
            {projects.map((project) => (
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
