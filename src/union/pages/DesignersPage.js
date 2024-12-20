import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { faXmark, faGlobe } from "@fortawesome/free-solid-svg-icons";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetAllDesignersQuery } from "../../data/designersSlice2";
import { useLocalStorage } from "../../context/LocalStorageContext";

const DesignersPage = () => {
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const localDesignersData = localStorageData.allDesigners;
  console.log("storage", localStorageData.allDesigners);

  const { t, i18n } = useTranslation();
  const { data: allDesigners } = useGetAllDesignersQuery();
  // const [activeDesigners, setAllDesigners] = useState([]);
  const [openImage, setOpenImage] = useState(null);

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // Load data from server and update localStorage if data has changed
  useEffect(() => {
    if (
      allDesigners &&
      isDataDifferent(
        localDesignersData,
        allDesigners?.filter((item) => item.activeStatus)
      )
    ) {
      updateLocalStorageData(
        "allDesigners",
        allDesigners?.filter((item) => item.activeStatus)
      );
    }
  }, [allDesigners, localDesignersData]);

  const handleOpenImage = (e) => {
    setOpenImage(e.target.src);
    console.log(openImage);
    document.querySelector(".designers-page-row").classList.add("blur");
    document.querySelector(".space-component").classList.add("blur");
  };

  const handleCloseImage = () => {
    if (openImage !== null) {
      setOpenImage(null);
      document.querySelector(".designers-page-row").classList.remove("blur");
      document.querySelector(".space-component").classList.remove("blur");
    }
  };

  return (
    <Container fluid className="designersPage px-0 " onClick={handleCloseImage}>
      <SpaceComponent info={{ h1: t("designers") }} className="w-100" />
      {openImage && (
        <Row className="open-image-container">
          {
            <Col sm={12} className="col">
              {/* <div className="background-filter"></div> */}
              <div className="open-image-container-inner">
                <FontAwesomeIcon icon={faXmark} />
                <img className="" src={openImage} alt="" />
              </div>
            </Col>
          }
        </Row>
      )}
      <Row className="designers-page-row py-3 py-lg-5">
        {localDesignersData &&
          localDesignersData.map((item, i) => (
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
                    <Card.Img src={item.images[1]} onClick={handleOpenImage} />
                  </div>
                  <div className="designersPage-designer-image-container">
                    <Card.Img
                      className="object-fit-cover"
                      src={item.images[0]}
                      onClick={handleOpenImage}
                    />
                  </div>
                </div>
                <Card.Body className="designersPage-card-body text-white">
                  {/* <Card.Title className="text-center">
                    {item.name[i18n.language].split(' ')[0]} 
                    <br/>
                    {item.name[i18n.language].split(' ')[1]}
                  </Card.Title> */}
                  <Card.Text className="text-center">
                    {item.name[i18n.language].split(" ")[0]}
                    <br />
                    {item.name[i18n.language].split(" ")[1]}
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
                        <div>
                          {item.companyPerson === 'person' ? <FontAwesomeIcon icon={faBehance} />: <FontAwesomeIcon icon={faGlobe} />}
                        </div>
                      </Button>
                    
                    <Button
                      href={`${item.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <div>
                        <FontAwesomeIcon icon={faFacebookF} />
                      </div>
                    </Button>
                    <Button
                      href={`${item.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                      variant="secondary"
                    >
                      <div>
                        <FontAwesomeIcon icon={faInstagram} />
                      </div>
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
