import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const FooterComponent = () => {
  const {t} = useTranslation();
  return (
    <Container fluid className="footer mb-0 py-5">
      <Row className="mb-0 pt-0 footer-row-1">
        {/* <Col sm={3}>Logo</Col> */}
        
        <Col sm={12} md={4} lg={4} xl={3} className="mb-0 footer-icons-col">
          <div>
            <h2 className="text-center mb-0 pb-4 fw-bold">{t("followUs")}</h2>
          </div>
          <div className="footer-icons-container pb-4">
            <a
              href="https://www.facebook.com/designlab2022"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="icon-size"
                size="2x"
              />
            </a>
            <a
              href="https://www.instagram.com/designlab.ge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="icon-size"
                size="2x"
              />
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="icon-size"
                size="2x"
              />
            </a>
            <a
              href="https://www.youtube.com/@designlab328"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="icon-size"
                size="2x"
              />
            </a>
          </div>
        </Col>
        <Col sm={12} md={4} lg={8} xl={7} className="mb-0">
          <div className="footer-contact-info-container p-4 p-md-0 pb-md-4  mtmd-0">
            <div className="footer-contact-info-tel mb-2 mb-lg-3">
              <h5>{t('tel')}</h5>
              <p>+995 599 64 06 41</p>
            </div>
            <div className="footer-contact-info-email mb-2 mb-lg-3">
              <h5>{t('email')}</h5>
              <p>info@design-lab-ge</p>
            </div>
            <div className="footer-contact-info-address">
              <h5>{t('address')}</h5>
              <p className="mb-0">{t("tbilisiGeorgia")}</p>
              <p className="mb-0">{t("AnaPolitkovskaia")}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-0">
        <p className="fs-6 mb-0 text-center">
          Created By © <span className="fw-bold">DESIGN-LAB.GE</span>
        </p>
      </Row>
    </Container>
  );
};

export default FooterComponent;
