import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";

const ProjectsPage = () => {
  const image1 = require("../../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../../images/union/projects-main-images/slide3-b.jpg");

  const { t } = useTranslation();

  return (
    <Container fluid className="projects-page px-0 mb-4 py-4 py-lg-5">
      {/* <SpaceComponent info={{ h1: t("projects") }} /> */}
      <Row className="projects-component-inner-containr px-0 mb-0">
        <Row className="projectsComponent-row-2 px-0">
          <div className="projectsComponent-projects-container px-0">
            <div className="projectsComponent-project projectsComponent-project-1">
              <Link to={`/project-1`}>
                <div className="projectsComponent-project-inner-container mx-0">
                  <div className="projectsComponent-project-image-container ">
                    <img
                      src={image1}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>PROJECT-1</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="projectsComponent-project projectsComponent-project-2">
              <Link to={`/project-2`}>
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container projectsComponent-project-image-container-2">
                    <img
                      src={image2}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container projectsComponent-project-text-container-2">
                    <p>project-2</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="projectsComponent-project projectsComponent-project-3">
              <Link to={`/project-3`}>
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container">
                    <img
                      src={image3}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>project-3</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Row>
        <Row className="mb-0">
        </Row>
      </Row>
    </Container>
  );
};

export default ProjectsPage;
