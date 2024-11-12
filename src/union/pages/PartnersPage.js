import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";


const PartnersPage = () => {
  const partners = useSelector((state) => state.partners);
  const { t } = useTranslation();

  return (
    <Container fluid className="partnersPage pb-5 my-0">
      <SpaceComponent info={{h1: t('partners')}}/>
      <Row className="partners-page-row">
        {partners &&
          partners.map((part, i) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xxl={3}
              key={i}
              className={`partnersPage-col partnersPage-col-${i} py-3 px-3`}
            >
              <div
                className={` partnersPage-col-inner-container partnersPage-col-inner-container-${i}`}
              >
                <div className="partnercPage-img-container">
                  <img src={part.logo} alt={part.name} />
                </div>
                <div className="partnersPage-text-container">
                  
                  <div className="partnersPage-text-inner-container ">
                    <h3>{part.name}</h3>
                    <p>{part.text}</p>
                  </div>
                  <div className="partnersPage-link ps-0">
                    <Button className="rounded-0 bg-dark border-light">
                        <a href='{part.link}' target="_blank" rel="noopener noreferrer">visit website</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PartnersPage;
