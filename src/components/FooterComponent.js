import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const FooterComponent = () => {
  return (
    <Container fluid className="footer mb-0 py-4">
      <Row className="mb-0">
        {/* <Col sm={3}>Logo</Col> */}
        <Col sm={12} className="mb-0">
          <div>
            <h5 className="text-center mb-0">FOLLOW US</h5>
          </div>
          <div className="footer-icons-container">
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
          </div>
        </Col>
      </Row>
      <Row className="mb-0">
        <p className="fs-6">Created By © <span className="fw-bold">DESIGN-LAB.GE</span></p>
      </Row>
    </Container>
  );
};

export default FooterComponent;
