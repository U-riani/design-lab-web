import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectsComponent = () => {
  const image1 = require("../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../images/union/projects-main-images/slide3-b.jpg");
  return (
    <Container fluid className="projects-component">
      <div className="projectsComponent-row-1">
        <h2 className="d-inline">Projects</h2>
      </div>
      <Row className="projectsComponent-row-2">
        <div className="projectsComponent-projects-container">
          <div className="projectsComponent-project projectsComponent-project-1">
            <Link to={`/project-1`}>
              <div className="projectsComponent-project-inner-container">
                <div className="projectsComponent-project-image-container ">
                  <img
                    src={image1}
                    className="projectsComponent-project-image"
                    alt=""
                  />
                </div>
                <div className="projectsComponent-project-text-container">
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
                <div className="projectsComponent-project-text-container">
                  <p>project-3</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <button className="see-more">
            <Link className="d-inline see-more-link ms-auto" to="/projects">
              see more
            </Link>
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsComponent;
