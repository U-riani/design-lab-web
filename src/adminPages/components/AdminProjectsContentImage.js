import React from "react";
import {Button, Row , Col, Alert} from "react-bootstrap";

const AdminProjectsContentImage = () => {
  return (
    <Row>
      <Button className="mx-3" variant="warning" >
        Update Image
      </Button>
      <Button variant="warning" >
        Add Image
      </Button>
      <Button className="mx-3" variant="warning" >
        Delete Image
      </Button>
    </Row>
  );
};

export default AdminProjectsContentImage;
