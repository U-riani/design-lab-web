import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import { useCreateDesignerMutation } from "../../data/designersSlice2";

const Registration = () => {
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();
  const [name, setName] = useState({ ge: "" });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyPerson, setCompanyPerson] = useState("person");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", variant: "" });

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleProjectPhotoChange = (e) => {
    setProjectPhoto(e.target.files[0]);
  };

  const clearForm = () => {
    setName({ ge: "" });
    setEmail("");
    setPhone("");
    setProfilePhoto(null);
    setProjectPhoto(null);
    setBehance("");
    setFacebook("");
    setInstagram("");
    setCompanyPerson("person");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);

    // Append the images array
    if (profilePhoto) formData.append("images", profilePhoto);
    if (projectPhoto) formData.append("images", projectPhoto);

    try {
      await createDesigner(formData).unwrap();
      setMessage({ text: "Successfully registered", variant: "success" });
      clearForm();
    } catch (error) {
      setMessage({
        text: "Technical issue, please try again",
        variant: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="px-0">
      <SpaceComponent info={{ h1: t("registration") }} className="w-100" />
      <Row className="pb-4">
        <Col className="d-flex justify-content-center">
          <Form className="registration-form">
            <FloatingLabel
              controlId="floatingInput"
              label="Full name"
              className="mb-3"
            >
              <Form.Control
                value={name.ge}
                onChange={(e) => setName({ ge: e.target.value })}
                type="text"
                placeholder="Full name"
              />
            </FloatingLabel>
            <div className="mb-3">
              <p>COMPANY / PERSON</p>
              <Form.Check
                type="radio"
                label="Company"
                name="radio"
                onClick={() => setCompanyPerson("company")}
              />
              <Form.Check
                type="radio"
                label="Person"
                name="radio"
                onClick={() => setCompanyPerson("person")}
              />
            </div>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPhone"
              label="Phone number"
              className="mb-3"
            >
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone number"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingProfilePhoto"
              label="Upload profile photo"
              className="mb-3"
            >
              <Form.Control
                onChange={handleProfilePhotoChange}
                type="file"
                accept="image/*"
              />
              {profilePhoto && (
                <img
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Profile Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingProjectPhoto"
              label="Upload project's photo"
              className="mb-3"
            >
              <Form.Control
                onChange={handleProjectPhotoChange}
                type="file"
                accept="image/*"
              />
              {projectPhoto && (
                <img
                  src={URL.createObjectURL(projectPhoto)}
                  alt="Project Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingBehance"
              label="Behance link"
              className="mb-3"
            >
              <Form.Control
                value={behance}
                onChange={(e) => setBehance(e.target.value)}
                type="url"
                placeholder="Behance link"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInstagram"
              label="Instagram link"
              className="mb-3"
            >
              <Form.Control
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                type="url"
                placeholder="Instagram link"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingFacebook"
              label="Facebook link"
              className="mb-3"
            >
              <Form.Control
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                type="url"
                placeholder="Facebook link"
              />
            </FloatingLabel>
            <Button
              className="bg-black border-0 py-3 fw-bold"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                t("submit")
              )}
            </Button>
            {message.text && (
              <Alert variant={message.variant} className="mt-3">
                {message.text}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;