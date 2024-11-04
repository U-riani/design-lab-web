import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const DesignersPage = () => {
  const designerBackground = require("../../images/X2oObC4.png");
  const designerPhoto = require("../../images/4FbD7mF.png");
  const designers = useSelector((state) => state.designers);
  return (
    <Container fluid className="designersPage px-0 pt-3 pt-lg-5">
      <Row className="desigrenspage-row">
        {designers &&
          designers.map((item, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              lg={4}
              xl={4}
              className="designersPage-card-col py-3"
            >
              <Card className="designersPage-card">
                <div className="designersPage-cards-images-top">
                  <div className="designersPage-background-image-container">
                    <Card.Img src={designerBackground} />
                  </div>
                  <div className="designersPage-designer-image-container">
                    <Card.Img src={designerPhoto} />
                  </div>
                </div>
                <Card.Body className="designersPage-card-body text-white">
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ButtonGroup
                    aria-label="designersPage-button-group"
                    className="designersPage-button-group pb-2"
                  >
                    <Button
                      href="http://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <FontAwesomeIcon icon={faBehance} />
                    </Button>
                    <Button
                      href="http://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button
                      href="http://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default DesignersPage;
