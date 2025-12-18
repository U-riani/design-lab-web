import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetAboutUsQuery } from "../../data/aboutUsSlice";
import { useLocalStorage } from "../../context/LocalStorageContext";

const AboutUs = () => {
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const localAboutUsData = localStorageData.aboutUs;

  const { t, i18n } = useTranslation();
  const { data } = useGetAboutUsQuery();
  const [imageSrc, setImageSrc] = useState("");

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // Load data from server and update localStorage if data has changed
  useEffect(() => {
    if (data && isDataDifferent(localAboutUsData, data)) {
      updateLocalStorageData("aboutUs", data);
    }
  }, [data, localAboutUsData]);

  useEffect(() => {
    if (localAboutUsData && localAboutUsData[0]?.image?.length > 0) {
      setImageSrc(localAboutUsData[0].image[0]);
    }
  }, [localAboutUsData]);

  const sanitizeHtml = (input) => {
    if (typeof input !== "string") return input;

    // Remove all inline styles
    let result = input.replace(/ style="[^"]*"/g, "");

    // Replace <br> with <br/>
    result = result.replace(/<br>/g, "<br/> </br>");

    // Remove all tags except allowed ones
    const allowedTags = ["ul", "ol", "li", "strong", "br"];
    result = result.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) => {
      return allowedTags.includes(tag.toLowerCase()) ? match : "";
    });

    // Preserve \n and \t as plain text
    result = result.replace(/\n/g, "\\n").replace(/\t/g, "\\t");

    const newResult = `<img src="${imageSrc}" class="aboutUs-page-image mb-3 ms-lg-3" alt="aboutUs Image"/> ${result}`;
    return newResult;
  };

  return (
    <Container
      fluid
      className="about-us-page px-0 d-flex flex-column align-items-center justify-content-start"
    >
      <SpaceComponent info={{ h1: t("aboutUs") }} className="w-100" />
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          {localAboutUsData && (
            <p
              className="about-us-page-p"
              lang={i18n.language === "en" ? "en" : "ka"}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(localAboutUsData[0].text[i18n.language]),
              }}
            >
              {/* <img
              className="aboutUs-page-image mb-3 ms-lg-3"
              src="/aboutUs-1.jpg"
              alt="About Us"
            />
            {t("aboutUs1")}
            <br />
            <br />
            {t("aboutUs2")} */}
            </p>
          )}
          {/* <p className="mb-0">{t("aboutUs2")}</p> */}
        </Col>
        {/* <Col sm={12} md={6}>
            <img src='/aboutUs-1.jpg'/>
        </Col> */}
        <Col sm={12}></Col>
      </Row>
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          <h3 className="mb-4 fw-bold fs-3">{t("ourTeam")}</h3>
        </Col>
        <Col
          sm={12}
          className="d-flex flex-column justify-content-center gap-4"
        >
          <div>
            <img
              className="w-100 object-fit-cover"
              src="/aboutUs-1.jpg"
              alt="About Us"
            />
          </div>
          <div>
            <div>
              <h5 className="f4-4">Mtavari saxeli</h5>
              <p className="fs-6">pozicia</p>
              <hr className="w-25" />
            </div>
            <div>
              <ul className="ps-3">
                <li>Responsibility 1</li>
                <li>Responsibility 2</li>
                <li>Responsibility 3</li>
                <li>Responsibility 4</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col sm={12} className="pt-5">
          <h3>Board Members</h3>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xxl={3} className="pt-3">
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Img variant="top" src="/aboutUs-1.jpg" />
            <Card.Body>
              <Card.Title className="fs-5">Saxeli Gvari</Card.Title>
              <Card.Text className="fs-6">
                Pozicia Some quick example text to build on the card title
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xxl={3} className="pt-3">
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Img variant="top" src="/aboutUs-1.jpg" />
            <Card.Body>
              <Card.Title className="fs-5">Saxeli Gvari</Card.Title>
              <Card.Text className="fs-6">
                Pozicia Some quick example text to build on the card title
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xxl={3} className="pt-3">
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Img variant="top" src="/aboutUs-1.jpg" />
            <Card.Body>
              <Card.Title className="fs-5">Saxeli Gvari</Card.Title>
              <Card.Text className="fs-6">
                Pozicia Some quick example text to build on the card title
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xxl={3} className="pt-3">
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Img variant="top" src="/aboutUs-1.jpg" />
            <Card.Body>
              <Card.Title className="fs-5">Saxeli Gvari</Card.Title>
              <Card.Text className="fs-6">
                Pozicia Some quick example text to build on the card title
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xxl={3} className="pt-3">
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Img variant="top" src="/aboutUs-1.jpg" />
            <Card.Body>
              <Card.Title className="fs-5">Saxeli Gvari</Card.Title>
              <Card.Text className="fs-6">
                Pozicia Some quick example text to build on the card title
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          <a
            href="/assets/documents/test.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            pdf1
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
