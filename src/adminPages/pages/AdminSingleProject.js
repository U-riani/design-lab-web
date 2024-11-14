import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import HeroBannerCarousel from "../../components/HeroBannerCarousel";
import SpaceComponent from "../../components/SpaceComponent";
import SingleProjectCarousel from "../../components/SingleProjectCarousel";
import { useTranslation } from "react-i18next";
import {
  useGetSingleProjectsQuery,
  useGetAllProjectsQuery,
  useDeleteProjectsMutation,
} from "../../data/projectsSlice";
import { useParams } from "react-router-dom";
import AdminEditProjects from "../components/AdminEditProjects";
import AdminProjectContentComponent from "../components/AdminProjectContentComponent";
import AdminAddPrjectContentComponent from "../components/AdminAddProjectContentComponent";

const AdminSingleProject = () => {
  const projectId = useParams().projectId;
  const {
    data: allProjects,
    error: allErrors,
    isLoading: allIsLoading,
  } = useGetAllProjectsQuery();
  const [deleteProjects] = useDeleteProjectsMutation();
  const {
    data: singleProject,
    error,
    isLoading,
  } = useGetSingleProjectsQuery(projectId);
  const { t, i18n } = useTranslation();

  const [heroData, setHeroData] = useState([]);
  const [toggleButtom, setToggleButtom] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to control visibility of AdminEditProjects
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State to control visibility of AdminEditProjects

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert((prevState) => !prevState);
  };

  useEffect(() => {
    if (singleProject) {
      singleProject.heroData.map((el, i) => {
        setHeroData((prev) => {
          return [...prev, singleProject.heroData];
        });
      });
    }
  }, [singleProject]);

  const handleUpdateProject = () => {
    // Toggle the visibility of AdminEditProjects when "Update" is clicked
    setShowEditForm((prevState) => !prevState);
  };

  const handleDeleteProject = async () => {
    try {
      const id = projectId;
      const response = await deleteProjects(id).unwrap();
      console.log("---deleted project", response);
    } catch (error) {
      console.log(error);
    }
  };

  const data2 = [1, 2, 3, 4];
  console.log(singleProject);
  return (
    <Container fluid className="single-project-page px-0 w-100">
      {singleProject && (
        <Row className="mx-0 w-100 d-flex flex-column align-content-center">
          <Row className="hero-banner px-0 w-100">
            <HeroBannerCarousel data={heroData} />
          </Row>
          <Row className="px-0 w-100">
            <SpaceComponent info={{ h1: singleProject.name[i18n.language] }} />
          </Row>
          <Row className="single-project-page-projects-container w-100 px-0 d-flex flex-column align-center">
            <Col sm={12} className="pb-4">
              <h3>{t("description")}</h3>
              <p>{singleProject.description[i18n.language]}</p>
            </Col>
            <Col sm={12} className="pb-5">
              <Button onClick={handleUpdateProject}>Update</Button>
              <Button variant="danger ms-5" onClick={handleShowDeleteAlert}>
                Delete Project
              </Button>
              {showDeleteAlert && (
                <Alert variant="warning">
                  <Alert.Heading>Warning !!! are you sure?</Alert.Heading>
                  <Button variant="danger ms-5" onClick={handleDeleteProject}>
                    Yes! Delete Project
                  </Button>
                </Alert>
              )}
            </Col>
            <Col sm={12} className="pb-5">
              <AdminAddPrjectContentComponent />
            </Col>

            {showEditForm && (
              <Col sm={12} className="py-4">
                <AdminEditProjects projectId={projectId} />
              </Col>
            )}
            {data2 &&
              data2.map((item, i) => (
                <Col
                  sm={12}
                  key={i}
                  className="project-title-carousel-youtube-container pb-5"
                >
                  <div className="item-title-container w-100">
                    <h2 className="text-left">TITLE</h2>
                  </div>
                  {/* <SingleProjectCarousel data={data2} className="w-100"/> */}
                  <div className="projects-youtube-container">
                    <iframe
                      className="youtube-iframe"
                      src="https://www.youtube.com/embed/PadKCVBIN94?list=RDPadKCVBIN94"
                      title="Queen - Bohemian Rhapsody 1981 Live Video Full HD"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <AdminProjectContentComponent />
                </Col>
              ))}
          </Row>
        </Row>
      )}
    </Container>
  );
};

export default AdminSingleProject;
