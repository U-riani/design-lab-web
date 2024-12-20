import React from "react";
import { Container, Row } from "react-bootstrap";
import MapComponent from "../../components/MapComponent";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="mx-0 px-0 contact-page">
      <SpaceComponent  info={{ h1: t("contact") }} className="w-100" />
      <Row className="contact-page-row-1 pt-4 pt-lg-5">
        {/* <VisitBookForm /> */}
        <div className="contact-info-container py-3 py-lg-4  px-2  mt-lg-0">
          <div className="contact-info-tel mb-3">
            {/* <h5>
             
            </h5> */}
            <p><FontAwesomeIcon icon={faPhone} /> +995 599 64 06 41</p>
          </div>
          <div className="contact-info-email mb-3">
            {/* <h5>
              
            </h5> */}
            <p><FontAwesomeIcon icon={faEnvelope} /> info@design-lab.ge</p>
          </div>
          <div className="contact-info-address">
            {/* <h5>
              
            </h5> */}
            <p className="mb-0 text-center"><FontAwesomeIcon icon={faMapLocationDot} /> {t("tbilisiGeorgia")}</p>
            <p className="mb-0 text-center">{t("AnaPolitkovskaia")}</p>
          </div>
        </div>
      </Row>
      <Row className="pt-4 pt-lg-5 contact-page-map-row">
        <MapComponent />
      </Row>
    </Container>
  );
};

export default ContactPage;
