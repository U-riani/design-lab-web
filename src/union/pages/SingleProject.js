import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroBannerCarousel from "../../components/HeroBannerCarousel";
import SpaceComponent from "../../components/SpaceComponent";
import SingleProjectCarousel from "../../components/SingleProjectCarousel";
import { useTranslation } from "react-i18next";
import { useGetSingleProjectsQuery } from "../../data/projectsSlice";
import { useParams } from "react-router-dom";
import SingleProjectsPageCarousel from "../../components/SingleProjectspageCarousel";
import SingleProjectsPageHeroBanner from "../../components/SingleProjectsPageHeroBanner";

const SingleProject = () => {
  const projectId = useParams().projectId;
  const {
    data: singleProject,
    error,
    isLoading,
  } = useGetSingleProjectsQuery(projectId);
  const heroData = [1, 2];
  const image1 = require("../../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../../images/union/projects-main-images/slide3-b.jpg");
  const { t, i18n } = useTranslation();

  const data = [image1, image2, image3];

  const data2 = [1, 2, 3, 4];

  console.log(singleProject);

  return (
    <Container fluid className="single-project-page px-0 w-100 pb-5">
      <Row className="hero-banner px-0 w-100">
        <SingleProjectsPageHeroBanner data={singleProject?.heroData} />
      </Row>
      <Row className="px-0 w-100 pb-3 pb-md-5">
        <SpaceComponent info={{ h1: singleProject?.name[i18n.language] }} />
      </Row>
      <Row className="single-project-page-projects-container d-flex flex-column align-center">
        <Col sm={12} className="pb-1">
          <h3 className="pb-3">{t("description")}</h3>
          <p>{singleProject?.description[i18n.language]}</p>
        </Col>
        {singleProject &&
          singleProject.projectContent.map((item, i) => (
            <Col sm={12} key={i} className="py-3 py-md-5 single-project-page-content">
              <div className="item-title-container">
                <h2 className="pb-2">{item.title[i18n.language]}</h2>
              </div>
              {item.media.images && item.media.images.length > 0 ? (
                <SingleProjectsPageCarousel data={item.media.images}
                />
              ) : (
                <div
                  className="single-projects-youtube"
                  dangerouslySetInnerHTML={{
                    __html: item.media.youtube,
                  }}
                />
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default SingleProject;
