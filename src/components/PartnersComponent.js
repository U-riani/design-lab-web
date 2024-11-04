import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarouselComponent from "./CarouselComponent";
import { useSelector } from "react-redux";
import SpaceComponent from "./SpaceComponent";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";

const PartnersComponent = () => {
  const partners = useSelector((state) => state.partners);
const {t} = useTranslation()
  // console.log(partners);
  return (
    <Container fluid className="partnersComponent-container px-0 py-0 mb-0">
      <Row className="partnersComponent-inner-container px-0 mb-0">

      
      {/* <SpaceComponent info={{h1: t('partners')}}/> */}
      <Row className="partnersComponent-row-1 mb-0  px-2 py-5 mx-0">
        <Col xl={3} className="px-0 pb-4 pb-xl-0 partners-title-container mb-0">
          <h2 className="align-left my-auto white-text pb-3 pb-xl-0">{t("partners")}</h2>
          <div className="partnersComponent-line mt-auto"></div>
        </Col>
        <Col xl={9} className="partnersComponent-carousel mb-0 pe-0 ps-0 pb-4 pb-sm-0">
          <CarouselComponent partners={partners} />
        </Col>
      </Row>
      </Row>
      {/* <Row className="partnersComponent-row-2 pb-0 mb-0"></Row> */}
    </Container>
  );
};

export default PartnersComponent;
