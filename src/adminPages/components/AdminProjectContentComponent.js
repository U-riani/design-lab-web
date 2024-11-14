import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import AdminprojectContentVideo from "./AdminprojectContentVideo";
import { useUpdateProjectsContentTitleMutation } from "../../data/projectContentSlice";
import { useParams } from "react-router-dom";
import { useGetSingleProjectsQuery } from "../../data/projectsSlice";
import AdminProjectsContentImage from "./AdminProjectsContentImage";

const AdminProjectContentComponent = ({ index }) => {
  const projectId = useParams().projectId;
  const { data: singleProject } = useGetSingleProjectsQuery(projectId);
  const [updateProjectContentTitle] = useUpdateProjectsContentTitleMutation();
  const [title, setTitle] = useState({});

  const [showTitle, setShowTitle] = useState(false);
  const [showVideoTools, setShowVideoTools] = useState(false);
  const [showImageTools, setShowImageTools] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    console.log("---", singleProject.projectContent[index].title);
    setTitle(singleProject.projectContent[index].title);
  }, [singleProject]);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleShowTitle = () => {
    setShowTitle((prev) => !prev);
  };
  const handleShowVideo = () => {
    setShowVideoTools((prev) => !prev);
  };
  const handleShowImageTools = () => {
    setShowImageTools((prev) => !prev);
  };
  const handleShowDeleteAlert = () => {
    setShowDeleteAlert((prev) => !prev);
  };

  const handleUpdateTitle = async () => {
    try {
      const response = await updateProjectContentTitle({
        id: projectId,
        index,
        title,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="">
          <Button variant="warning" onClick={handleShowTitle}>
            Update Title
          </Button>
          <Button
            className="mx-3"
            variant="warning"
            onClick={handleShowImageTools}
          >
            Update Image
          </Button>
          <Button className="me-3" variant="warning" onClick={handleShowVideo}>
            Update Video
          </Button>
          <Button variant="danger" onClick={handleShowDeleteAlert}>
            Delete Content
          </Button>
        </Col>
      </Row>
      <Row>
        {showTitle ? (
          <Col>
            <h2>Update title</h2>
            <Col>
              <label htmlFor="update-title-ge">update title</label>
              <input
                type="text"
                id="update-title-ge"
                value={title.ge || ""}
                onChange={(e) => handleTitleChange("ge", e.target.value)}
              />
            </Col>
            <Col>
              <label htmlFor="update-title-en">update title</label>
              <input
                type="text"
                id="update-title-en"
                value={title.en || ""}
                onChange={(e) => handleTitleChange("en", e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="success" onClick={handleUpdateTitle}>
                Update
              </Button>
            </Col>
          </Col>
        ) : showImageTools ? (
          <AdminProjectsContentImage index={index} id={projectId}/>
        ) : showVideoTools ? (
          <AdminprojectContentVideo index={index} />
        ) : showDeleteAlert ? (
          <h1>Delete content</h1>
        ) : null}
      </Row>
    </Container>
  );
};

export default AdminProjectContentComponent;
