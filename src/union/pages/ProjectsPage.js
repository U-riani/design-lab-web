import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import image1 from "../../images/union/hero-banner/slide1-b.jpg";

const ProjectsPage = () => {
  const projects = useSelector((state) => state.projects);
  return (
    <Container fluid>
      <Row>
        <Col
          xs={12}
          sm={6}
          lg={4}
          xxl={3}
          className={`projectsPage-col projectsPage-col-1`}
          
        >
          <div
            className={` projectsPage-col-inner-container projectsPage-col-inner-container-1 mb-0`}
          >
            <div className="partnercPage-img-container mb-0">
              <img src={image1} alt={"s"} />
            </div>
            <div className="projectsPage-text-container">
              <div className="projectsPage-text-inner-container ">
                <h3>{""}</h3>
                <p>{""}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          xxl={3}
          className={`projectsPage-col projectsPage-col-1`}
        >
          <div
            className={` projectsPage-col-inner-container projectsPage-col-inner-container-1`}
          >
            <div className="partnercPage-img-container">
              <img src={image1} alt={"s"} />
            </div>
            <div className="projectsPage-text-container">
              <div className="projectsPage-text-inner-container ">
                <h3>{""}</h3>
                <p>{""}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          xxl={3}
          className={`projectsPage-col projectsPage-col-1`}
        >
          <div
            className={` projectsPage-col-inner-container projectsPage-col-inner-container-1`}
          >
            <div className="partnercPage-img-container">
              <img src={image1} alt={"s"} />
            </div>
            <div className="projectsPage-text-container">
              <div className="projectsPage-text-inner-container ">
                <h3>{""}</h3>
                <p>{""}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsPage;
