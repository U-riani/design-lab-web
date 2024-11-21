import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SpaceComponent from "./SpaceComponent";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const AboutUsComponent = () => {
  const { t } = useTranslation();

  return (
    <Container
      fluid
      className="px-0 aboutUs-component d-flex flex-column align-items-center justify-content-start"
    >
      <SpaceComponent info={{ h1: t("aboutUs") }} className="w-100" />
      <Row className="aboutUs-component-inner-container mx-0 my-3 my-md-5 py-3 py-md-4  px-3">
        <Col
          sm={12}
          lg={6}
          className="aboutUs-component-col-1 d-flex  flex-column justify-content-start align-items-start"
        >
          <h3>DESIGN UNION</h3>
          <p className="mb-0">{t("aboutUs1")}</p>
          <div className="newsComponent-see-more-button-col mt-auto overflow-hidden d-flex align-self-end me-auto py-4 pb-lg-0">
            <button className="see-more">
              <Link className="see-more-link px-3 py-2 py-sm-3" to="/aboutUs">
                <span>more</span>
                <em></em>
              </Link>
            </button>
          </div>
        </Col>
        <Col sm={12} lg={6}>
          <img src="aboutUs-1.jpg" className="aboutUs-component-img" />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsComponent;
