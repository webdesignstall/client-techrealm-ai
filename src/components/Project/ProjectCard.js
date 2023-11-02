import React from "react";
import { Card, Tag } from "antd";
import Link from "next/link";
import _ from "lodash";

const ProjectCard = ({ project }) => {
  return (
    <>
      <Link href={`/dashboard/project/${project.link}`}>
        <Card>
          <h3 style={{ marginBottom: "10px" }}>{project.projectName}</h3>
          <p style={{ marginBottom: "10px" }}>
            {_.truncate(project.prompt, {
              length: 150,
              omission: "...",
            })}
          </p>
          <p>
            <Tag color="green">{project.projectType}</Tag>
          </p>
        </Card>
      </Link>
    </>
  );
};

export default ProjectCard;
