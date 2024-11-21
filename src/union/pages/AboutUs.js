import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Container
      fluid
      className="about-us-page px-0 d-flex flex-column align-items-center justify-content-start"
    >
      <SpaceComponent info={{ h1: t("aboutUs") }} className="w-100" />
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          <p className="">{""}
            <img className="aboutUs-page-image mb-3 ms-lg-3" src="/aboutUs-1.jpg" alt="About Us" />
            {t("aboutUs1")}
            <br/>
            <br/>
            {t("aboutUs2")}
          </p>
          {/* <p className="mb-0">{t("aboutUs2")}</p> */}
        </Col>
        {/* <Col sm={12} md={6}>
            <img src='/aboutUs-1.jpg'/>
        </Col> */}
        <Col sm={12}></Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
