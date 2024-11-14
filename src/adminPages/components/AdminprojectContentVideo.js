import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useCreateProjectsContentVideoMutation, useUpdateProjectsContentVideoMutation } from "../../data/projectContentSlice";
import { useParams } from "react-router-dom";

const AdminprojectContentVideo = ({index}) => {

  const projectId = useParams().projectId;

  const [video, setVideo] = useState("");
  const [createProjectContentVideo] = useCreateProjectsContentVideoMutation();
  const [updateProjectContentVideo] = useUpdateProjectsContentVideoMutation();

  const handleVideoChange = (value) => {
    setVideo(value);
  };

  //   const handleShowAddVideo = () => {
  //     setToggleShowImage(false);
  //     setToggleShowVideo(!toggleShowVideo);
  //   };

  const handleCreateContentVideo = async () => {
    try {
      const response = await createProjectContentVideo({
        video,
        id: projectId,
        index
      }).unwrap();
      console.log("--Video created:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateContentVideo = async () => {
    try {
      const response = await updateProjectContentVideo({
        video,
        id: projectId,
        index
      }).unwrap();
      console.log("--Video updated:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {/* <Col sm={6} className="text-info">
        <label htmlFor="Video">add Video</label>
        <input
          type="text"
          id="Video"
          onChange={(e) => handleVideoChange(e.target.value)}
        />
        <Button variant="success" onClick={handleCreateContentVideo}>
          Create
        </Button>
      </Col> */}
      <Col sm={6} className="text-info">
        <label htmlFor="Video">Update</label>
        <input
          type="text"
          id="Video"
          onChange={(e) => handleVideoChange(e.target.value)}
        />
        <Button variant="success" onClick={handleCreateContentVideo}>
          Create/update
        </Button>
      </Col>
    </Row>
  );
};

export default AdminprojectContentVideo;
