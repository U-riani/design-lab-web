import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarouselComponent from "./CarouselComponent";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PartnersComponent = () => {
  const partners = useSelector((state) => state.partners);

  // console.log(partners);
  return (
    <Container fluid className="partnersComponent-container px-0 py-4 mb-0">
      <Row className="partnersComponent-row-1 mb-0 pb-0 px-2">
        <Col sm={3} className="px-0 pb-4 pb-sm-0 partners-title-container mb-0">
          <h2 className="align-left my-auto white-text">PARTNERS</h2>
          <div className="partnersComponent-line mt-auto"></div>
        </Col>
        <Col sm={9} className="partnersComponent-carousel mb-0 pe-0 ps-0 pb-4 pb-sm-0">
          <CarouselComponent partners={partners} />
        </Col>
      </Row>
      {/* <Row className="partnersComponent-row-2 pb-0 mb-0"></Row> */}
    </Container>
  );
};

export default PartnersComponent;
