import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "./SpaceComponent";
import { useGetLastThreeProjectsQuery } from "../data/projectsSlice";

const ProjectsComponent = () => {
  const image1 = require("../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../images/union/projects-main-images/slide3-b.jpg");
  const { data, error, isLoading } = useGetLastThreeProjectsQuery();

  console.log(data);

  const { t, i18n } = useTranslation();

  return (
    <Container fluid className="projects-component px-0 mb-4">
      <SpaceComponent info={{ h1: t("projects") }} />
      <Row className="projects-component-inner-containr py-3 py-md-5 px-0 mb-0">
        <Row className="projectsComponent-row-2 px-0">
          <div className="projectsComponent-projects-container px-0">
            <div className="projectsComponent-project projectsComponent-project-1">
              {data && (
                <Link to={`/projects/${data[0].id}`}>
                  <div className="projectsComponent-project-inner-container mx-0">
                    <div className="projectsComponent-project-image-container ">
                      <img
                        src={data[0].image}
                        className="projectsComponent-project-image"
                        alt=""
                      />
                    </div>
                    <div className="projectsComponent-project-text-container mb-3 mb-lg-5 py-2 px-1">
                      <p className="px-md-2 ">{data[0].name[i18n.language]}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="projectsComponent-project projectsComponent-project-2">
              <a
                href="https://www.design-lab.ge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container projectsComponent-project-image-container-2">
                    <img
                      src={image2}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container projectsComponent-project-text-container-2 ">
                    <p>დიზაინ - ლაბი</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="projectsComponent-project projectsComponent-project-3">
              {data && (
                <Link to={`/projects/${data[1].id}`}>
                  <div className="projectsComponent-project-inner-container mx-0">
                    <div className="projectsComponent-project-image-container ">
                      <img
                        src={data[1].image}
                        className="projectsComponent-project-image"
                        alt=""
                      />
                    </div>
                    <div className="projectsComponent-project-text-container mb-3 mb-lg-5 py-2 px-1">
                      <p className="px-md-2 ">{data[1].name[i18n.language]}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </Row>
        <Row className="mb-0 pt-3 pt-lg-4 px-0 projects-component-button-container">
          <Col className="d-flex justify-content-end mb-0 px-0">
            <button className="see-more">
              <Link className="d-inline see-more-link ms-auto" to="/projects">
                see more
              </Link>
            </button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ProjectsComponent;
