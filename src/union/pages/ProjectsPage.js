import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import {
  useGetAllProjectsImageTitleQuery,
  useGetAllProjectsQuery,
} from "../../data/projectsSlice";

const ProjectsPage = () => {
  const { data: allProjects } = useGetAllProjectsImageTitleQuery();
  const { data: projects } = useGetAllProjectsQuery();
  const image1 = require("../../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../../images/union/projects-main-images/slide3-b.jpg");
  const projectname = "projectName";

  const { t, i18n } = useTranslation();
  console.log("--projects:", projects);
  console.log("--name/image:", allProjects);

  return (
    <Container fluid className="projects-page px-0 mb-4 pb-4 pb-lg-5">
      <SpaceComponent info={{ h1: t("projects") }} />
      <Row className="projects-page-inner-containr mx-0 px-0 mb-0">
        {allProjects &&
          allProjects.map((el, i) => (
            <Col
            key={i}
              as={Link}
              to={`/projects/${el.id}`}
              sm={12}
              className={`projects-page-project-col mx-0 py-3`}
            >
              <div className="projects-page-img-container">
                <img src={el.image} alt="" />
              </div>
              <div className="projects-page-title-container p-3">
                <h3 className="pt-1">{el.name[i18n.language]}</h3>
              </div>
            </Col>
          ))}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col py-3`}>
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col pb-3`}>
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col`}>
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Row className="projectsComponent-row-2 px-0">
          <div className="projectsComponent-projects-container px-0">
            <div className="projectsComponent-project projectsComponent-project-1">
              <Link to={`/podcast`}>
                <div className="projectsComponent-project-inner-container mx-0">
                  <div className="projectsComponent-project-image-container ">
                    <img
                      src={image1}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>PODCAST</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="projectsComponent-project projectsComponent-project-2">
              <a href="https://design-lab.ge/index.html"
                      target="_blank"
                      rel="noopener noreferrer" >
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container projectsComponent-project-image-container-2">
                    <img
                      src={image2}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container projectsComponent-project-text-container-2">
                    <p>DESIGN-LAB</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="projectsComponent-project projectsComponent-project-3">
              <Link to={`/school`}>
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container">
                    <img
                      src={image3}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>SCHOOL</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Row> */}
        <Row className="mb-0"></Row>
      </Row>
    </Container>
  );
};

export default ProjectsPage;
