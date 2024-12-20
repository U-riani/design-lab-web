import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
    </Container>
  );
};

export default AboutUs;
