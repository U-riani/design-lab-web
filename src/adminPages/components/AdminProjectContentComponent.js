import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const AdminProjectContentComponent = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showImageTools, setShowImageTools] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleShowTitle = () => {
    setShowTitle((prev) => !prev);
  };
  const handleShowmageTools = () => {
    setShowImageTools((prev) => !prev);
  };
  const handleShowDeleteAlert = () => {
    setShowDeleteAlert((prev) => !prev);
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
            onClick={handleShowmageTools}
          >
            Update Image
          </Button>
          <Button variant="warning" onClick={handleShowmageTools}>
            Add Image
          </Button>
          <Button className="mx-3" variant="warning" onClick={handleShowmageTools}>
            Delete Image
          </Button>
          <Button
            className="me-3"
            variant="warning"
            onClick={handleShowmageTools}
          >
            Update Video
          </Button>
          <Button variant="danger" onClick={handleShowDeleteAlert}>
            Delete Content
          </Button>
        </Col>
      </Row>
      <Row>{showTitle ? <h1>Update Title</h1> : showImageTools ? <h1>Update Image</h1> : showDeleteAlert ? <h1>Delete content</h1> : null}</Row>
    </Container>
  );
};

export default AdminProjectContentComponent;
