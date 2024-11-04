import React from "react";
import { Container, Row } from "react-bootstrap";
import VisitBookForm from "../../components/VisitorBook";
import MapComponent from "../../components/MapComponent";

const ContactPage = () => {
  return (
    <Container fluid className="mx-0 pt-4 pt-lg-5">
      <Row>
        <VisitBookForm />
      </Row>
      <Row className="pt-4 pt-lg-5 contact-page-map-row">
        <MapComponent />
      </Row>
    </Container>
  );
};

export default ContactPage;
