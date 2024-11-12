import React from "react";
import { Container, Row } from "react-bootstrap";
import VisitBookForm from "../../components/VisitorBook";
import MapComponent from "../../components/MapComponent";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";


const ContactPage = () => {
  const {t} = useTranslation();

  return (
    <Container fluid className="mx-0 px-0 contact-page">
        <SpaceComponent info={{h1: t('contact')}} className="w-100"/>
        <Row className="contact-page-row-1">
        <VisitBookForm />
      </Row>
      <Row className="pt-4 pt-lg-5 contact-page-map-row">
        <MapComponent />
      </Row>
    </Container>
  );
};

export default ContactPage;
