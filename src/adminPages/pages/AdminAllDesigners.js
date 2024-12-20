import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  Card,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import {
  useDeleteDesignerMutation,
  useGetAllDesignersQuery,
  useUpdateDesignerMutation,
} from "../../data/designersSlice2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const AdminAllDesigners = () => {
  const { i18n } = useTranslation();
  const { data: allDesigners, error, isLoading } = useGetAllDesignersQuery();
  const [deleteDesigner, { isLoading: isDeleting }] =
    useDeleteDesignerMutation();
  const [updateDesigner, { isLoading: isUpdating }] =
    useUpdateDesignerMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [image, setImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [behance, setBehance] = useState("");
  const [activeStatus, setActiveStatus] = useState(false);
  const [companyPerson, setCompanyPerson] = useState("");
  const [id, setId] = useState(null);

  // console.log(allDesigners);
  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleProjectPhotoChange = (e) => {
    setProjectPhoto(e.target.files[0]);
  };

  const handleNameChange = (lang, e) => {
    setName((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleCompanynameChange = (e) => {
    setCompanyPerson(e.target.value); // This will automatically set activeStatus to true/false
  };

  const handleStatusChange = (e) => {
    setActiveStatus(e.target.checked); // This will automatically set activeStatus to true/false
  };
  console.log(companyPerson);
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const images = [profilePhoto, projectPhoto];
      await updateDesigner({
        id,
        text,
        name,
        companyPerson,
        images,
        facebook,
        instagram,
        behance,
        activeStatus, // Add activeStatus here
      }).unwrap();
      alert("Designer updated successfully!");
      // Reset form and hide update section after success
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setImage(null);
      setFacebook("");
      setInstagram("");
      setBehance("");
      setActiveStatus(false); // Reset activeStatus after successful update
      setShowUpdate(false);
      setUpdateCol(null);
    } catch (error) {
      alert("Designer Update error:", error.message);
    }
  };
  console.log(companyPerson)

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setName(item.name);
    setText(item.text);
    setFacebook(item.facebook);
    setInstagram(item.instagram);
    setBehance(item.behance);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
    setActiveStatus(item.activeStatus === true || false);
    console.log(item);
    setCompanyPerson(item.companyPerson);
    setProfilePhoto(item.images[0]);
    setProjectPhoto(item.images[1]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDesigner(id).unwrap();
    } catch (error) {
      console.log("Designer Delete error:", error.message);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && (
          <Alert variant="danger">Failed to load heroes: {error.message}</Alert>
        )}
        {allDesigners &&
          allDesigners.map((item, i) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xl={4}
              key={item._id}
              className="my-3 my-2 border border-2 "
            >
              <Col
                key={item._id}
                xs={12}
                className="designersPage-card-col py-3"
              >
                <Card className="designersPage-card">
                  <div className="designersPage-cards-images-top">
                    <div className="designersPage-background-image-container">
                      <Card.Img src={item.images[1]} />
                    </div>
                    <div className="designersPage-designer-image-container">
                      <Card.Img
                        src={item.images[0]}
                        className="object-fit-cover"
                      />
                    </div>
                  </div>
                  <Card.Body className="designersPage-card-body text-white">
                    <Card.Title>{item.name[i18n.language]}</Card.Title>
                    {/* <Card.Title>{item.companyPerson}</Card.Title> */}
                    <Card.Text>{item.text[i18n.language]}</Card.Text>
                    <ButtonGroup
                      aria-label="designersPage-button-group"
                      className="designersPage-button-group pb-2"
                    >
                      <Button
                        href={item.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link"
                        variant="secondary"
                      >
                        <FontAwesomeIcon icon={faBehance} />
                      </Button>
                      <Button
                        href={item.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link"
                        variant="secondary"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </Button>
                      <Button
                        href={item.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link"
                        variant="secondary"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="admin-heros-text">
                <div className="d-flex">
                  <Button onClick={() => handleShowUpdate(item)}>Update</Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                    disabled={isDeleting}
                    className="ms-2"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                  {item.activeStatus === true ? (
                    <Button className=" bg-success">active</Button>
                  ) : (
                    <Button disabled className="bg-warning">
                      not active
                    </Button>
                  )}
                </div>
                {updateCol === item._id && (
                  <form onSubmit={handleSubmitUpdate} className="mt-3">
                    {/* <input
                      type="file"
                      onChange={handleProfilePhotoChange}
                      className="mb-2"
                    /> */}
                    <label htmlFor="profImag">profile image</label>
                    <input
                      id="profImg"
                      type="file"
                      onChange={handleProfilePhotoChange}
                      className="mb-2"
                    />
                    <label htmlFor="projImag">profile image</label>
                    <input
                      id="projImg"
                      type="file"
                      onChange={handleProjectPhotoChange}
                      className="mb-2"
                    />
                    <Row>
                      <Col sm={6}>
                        <label htmlFor="person">Person</label>
                        <input
                          id="person"
                          type="radio"
                          name="companyPerson"
                          value={"person"}
                          checked={companyPerson === "person"}
                          className="w-100 mb-2"
                          placeholder="კომპანია / ფიზ. პირი"
                          onChange={(e) => setCompanyPerson(e.target.value)}
                        />
                      </Col>
                      <Col sm={6}>
                        <label htmlFor="company">Company</label>
                        <input
                          id="company"
                          type="radio"
                          name="companyPerson"
                          value={"company"}
                          checked={companyPerson === "company"}
                          className="w-100 mb-2"
                          placeholder="კომპანია / ფიზ. პირი"
                          onChange={(e) => setCompanyPerson(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <input
                      value={name.ge}
                      className="w-100 mb-2"
                      placeholder="ქართული სათაური"
                      onChange={(e) => handleNameChange("ge", e)}
                    />
                    <input
                      value={name.en}
                      onChange={(e) => handleNameChange("en", e)}
                      className="w-100 mb-2"
                      placeholder="English name"
                    />
                    <textarea
                      value={text.ge}
                      className="w-100 mb-2"
                      placeholder="ქართული ტექსტი"
                      onChange={(e) => handleTextChange("ge", e)}
                    />
                    <textarea
                      value={text.en}
                      onChange={(e) => handleTextChange("en", e)}
                      className="w-100 mb-2"
                      placeholder="English text"
                    />
                    <Col sm={12}>
                      <input
                        value={facebook}
                        className=" mb-2"
                        placeholder="facebook url"
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                      <input
                        value={instagram}
                        className=" mb-2"
                        placeholder="instagram url"
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                      <input
                        value={behance}
                        className=" mb-2"
                        placeholder="behance url"
                        onChange={(e) => setBehance(e.target.value)}
                      />
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Status"
                        checked={activeStatus}
                        onChange={handleStatusChange}
                      />
                    </Col>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save Update"}
                    </Button>
                  </form>
                )}
                {/* {allDesigners &&
                    allDesigners.map((item, i) => (
                    ))} */}
              </Col>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AdminAllDesigners;
