import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const DesignersPage = () => {
  const designers = useSelector((state) => state.designers);
  return (
    <Container fluid className="designersPage">
      <Row className="desigrenspage-row">
        {designers &&
          designers.map((item, i) => (
            <Col key={i} xs={12}  sm={6} lg={4} xl={3} className="">
              <Card className="designersPage-card bg-dark">
                <Card.Img
                  className="designersPage-img"
                  variant="top"
                  src={item.logo}
                />
                <Card.Body className="designersPage-card-body text-white">
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a
                    href="http://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="designersPage-a"
                  >
                    <Button className="rounded-0 designersPage-button" variant="dark"><FontAwesomeIcon icon={faLink} /> <span> VISIT PROFILE</span></Button>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default DesignersPage;
