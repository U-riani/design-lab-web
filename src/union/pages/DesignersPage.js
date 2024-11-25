import React, { useEffect, useState } from "react";
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
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetAllDesignersQuery } from "../../data/designersSlice2";

const DesignersPage = () => {
  const designerBackground = require("../../images/X2oObC4.png");
  const designerPhoto = require("../../images/4FbD7mF.png");
  const designers = useSelector((state) => state.designers);
  const {t, i18n} = useTranslation();
  const {data: allDesigners} = useGetAllDesignersQuery();
  const [activeDesigners, setAllDesigners] = useState([]);

  useEffect(() => {
    setAllDesigners(allDesigners?.filter(item => item.activeStatus))
  }, [allDesigners])
 
  return (
    <Container fluid className="designersPage px-0">
        <SpaceComponent info={{h1: t('designers')}} className="w-100"/>
      
      <Row className="designers-page-row py-3 py-lg-5">
        {activeDesigners &&
          activeDesigners.map((item, i) => (
            <Col
              key={i}
              xs={6}
              sm={5}
              md={4}
              lg={3}
              xl={3}
              className="designersPage-card-col py-3 d-flex justify-content-center align-items-start"
            >
              <Card className="designersPage-card">
                <div className="designersPage-cards-images-top">
                  <div className="designersPage-background-image-container">
                    <Card.Img src={item.images[1]} />
                  </div>
                  <div className="designersPage-designer-image-container">
                    <Card.Img className="object-fit-cover" src={item.images[0]} />
                  </div>
                </div>
                <Card.Body className="designersPage-card-body text-white">
                  <Card.Title className="text-center">{item.name[i18n.language]}</Card.Title>
                  <Card.Text>
                  {item.text[i18n.language]}
                  </Card.Text>
                  <ButtonGroup
                    aria-label="designersPage-button-group"
                    className="designersPage-button-group pb-2"
                  >
                    <Button
                      href={`${item.behance}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <FontAwesomeIcon icon={faBehance} />
                    </Button>
                    <Button
                      href={`${item.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button
                      href={`${item.instagram}`}
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
