import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useCreateProjectsContentMutation } from "../../data/projectContentSlice";

const AdminAddPrjectContentComponent = () => {
  const [toggleShow, setToggleShow] = useState(false);
  const [toggleShowImage, setToggleShowImage] = useState(false);
  const [toggleShowVideo, setToggleShowVideo] = useState(false);
  const [imagesFiles, setImagesFIles] = useState([""]);

  const [title, setTitle] = useState({ge: '', en: ''})

  const [createProjectsContent] = useCreateProjectsContentMutation();

  const handleAddMoreImages = () => {
    const newImage = {
      image: null,
    };
    setImagesFIles([...imagesFiles, newImage]);
  };

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => {
      return {...prev, [lang]: value}
    })
    console.log(title)
  }

  const handleImageChange = (index, file) => {
    const updatedImageFiles = imagesFiles.map((el, i) => {
      if (i === index) {
        const updatedImages = {
          ...el, // Clone the hero object
          image: file,
          url: URL.createObjectURL(file),
        };
        return updatedImages;
      }
      return el;
    });

    setImagesFIles(updatedImageFiles);
  };

  console.log(imagesFiles)

  const handleShowAddImage = () => {
    setToggleShowImage(true);
    setToggleShowVideo(false);
  };
  const handleShowAddVideo = () => {
    setToggleShowImage(false);
    setToggleShowVideo(!toggleShowVideo);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Button onClick={() => setToggleShow(!toggleShow)}>
            Add Content
          </Button>
        </Col>
      </Row>
      {toggleShow && (
        <Row>
          <Col sm={12} className="py-3">
            <label htmlFor="title-ge">ქართული სათაური</label>
            <input type="text" id="title-ge" value={title.ge} onChange={(e) => handleTitleChange('ge', e.target.value)} />
          </Col>
          <Col sm={12} className="py-3">
            <label htmlFor="title-en">English title</label>
            <input type="text" id="title-en" value={title.en} onChange={(e) => handleTitleChange('en', e.target.value)}/>
          </Col>
          <Col sm={12} className="py-3">
            <Button variant="success">Save Title</Button>
          </Col>
          <Col sm={12}>
            <Button onClick={handleShowAddImage}>Add Image</Button>
            <Button onClick={handleShowAddVideo}>Add video</Button>
          </Col>
          <Col sm={12} className="py-3">
            {toggleShowImage &&
              imagesFiles.map((el, index) => (
                <Col key={index} sm={12} className="text-danger">
                  <label htmlFor="image">add image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                    />
                    {el.url && <div style={{width: "100px", height: "100px"}}>
                    <img src={el.url} alt="Selected" width="100%" height="100%" />
                      </div>}
                  <Button className="m-3" variant="success">
                    Create
                  </Button>
                  <Col className="my-3 d-flex justify-content-center align-items-center">
                    <Button onClick={handleAddMoreImages}>
                      Add MoreImages
                    </Button>
                  </Col>
                </Col>
              ))}
            {toggleShowVideo && (
              <Col sm={12} className="text-info">
                <label htmlFor="Video">add Video</label>
                <input type="text" id="Video" />
                <Button variant="success">Create</Button>
              </Col>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminAddPrjectContentComponent;
