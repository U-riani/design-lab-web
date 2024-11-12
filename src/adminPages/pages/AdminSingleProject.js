import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroBannerCarousel from "../../components/HeroBannerCarousel";
import SpaceComponent from "../../components/SpaceComponent";
import SingleProjectCarousel from "../../components/SingleProjectCarousel";
import { useTranslation } from "react-i18next";
import {
  useGetSingleProjectsQuery,
  useGetAllProjectsQuery,
  useDeleteProjectsMutation,
  useUpdateProjectsMutation,
} from "../../data/projectsSlice";
import { useParams } from "react-router-dom";
import AdminEditProjects from "../components/AdminEditProjects";

const AdminSingleProject = () => {
  const projectId = useParams().projectId;
  const {
    data: allProjects,
    error: allErrors,
    isLoading: allIsLoading,
  } = useGetAllProjectsQuery();
  const [deleteProjects] = useDeleteProjectsMutation(projectId);
  const [updateProject] = useUpdateProjectsMutation();
  const {
    data: singleProject,
    error,
    isLoading,
  } = useGetSingleProjectsQuery(projectId);
  const { t, i18n } = useTranslation();

  const [heroData, setHeroData] = useState([]);
  const [toggleButtom, setToggleButtom] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to control visibility of AdminEditProjects

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


  const data2 = [1, 2, 3, 4];
console.log(singleProject)
  return (
    <Container fluid className="single-project-page px-0 w-100">
      {singleProject && (
        <Row className="mx-0 w-100">
          <Row className="hero-banner px-0 w-100">
            <HeroBannerCarousel data={heroData} />
          </Row>
          <Row className="px-0 w-100">
            <SpaceComponent info={{ h1: singleProject.name[i18n.language] }} />
          </Row>
          <Row className="single-project-page-projects-container d-flex flex-column align-center">
            <Col sm={12}>
              <h3>{t("description")}</h3>
              <p>{singleProject.description[i18n.language]}</p>
            </Col>
            <Col sm={12}>
              <Button onClick={handleUpdateProject}>Update</Button>
              <Button
                variant="danger ms-5"
                onClick={() => deleteProjects(projectId)}
              >
                Delete
              </Button>
            </Col>
            {/* Conditionally render AdminEditProjects */}
            {showEditForm && (
              <Col sm={12}>
                <AdminEditProjects projectId={projectId} />
              </Col>
            )}
            {data2 &&
              data2.map((item, i) => (
                <Col sm={12} key={i}>
                  <div className="item-title-container">
                    <h2>TITLE</h2>
                  </div>
                  <SingleProjectCarousel data={data2} />
                </Col>
              ))}
          </Row>
        </Row>
      )}
    </Container>
  );
};

export default AdminSingleProject;
