import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroBannerCarousel from "../../components/HeroBannerCarousel";
import SpaceComponent from "../../components/SpaceComponent";
import SingleProjectCarousel from "../../components/SingleProjectCarousel";
import { useTranslation } from "react-i18next";

const SingleProject = () => {
  const heroData = [1, 2];
  const image1 = require("../../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../../images/union/projects-main-images/slide3-b.jpg");
  const {t} = useTranslation();

  const data = [image1, image2, image3];

  const data2 = [1, 2, 3, 4];

  return (
    <Container fluid className="single-project-page px-0 w-100">
      <Row className="hero-banner px-0 w-100">
        <HeroBannerCarousel data={heroData} />
      </Row>
      <Row className="px-0 w-100">
        <SpaceComponent info={{ h1: "PODCAST" }} />
      </Row>
      <Row className="single-project-page-projects-container d-flex flex-column align-center">
        <Col sm={12}>
          <h3>{t('description')}</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        {data2 &&
          data2.map((item, i) => (
            <Col sm={12} key={i}>
              <div className="item-title-container">
                <h2>TITLE</h2>
              </div>
              <SingleProjectCarousel data={data} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default SingleProject;
