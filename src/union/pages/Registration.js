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
  InputGroup,
} from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCloudArrowUp
// } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import { useCreateDesignerMutation } from "../../data/designersSlice2";
import DesignerCardComponent from "../../components/DesignerCardComponent";

const Registration = () => {
  const maxSize = 10 * 1024 * 1024;
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
  const [companyPerson, setCompanyPerson] = useState("");
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

  // console.log(profilePhoto);

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);
    formData.append("phone", phone);

    // Append the images array
    if (profilePhoto) formData.append("images", profilePhoto);
    if (projectPhoto) formData.append("images", projectPhoto);

    try {
      if (
        name.ge !== "" &&
        companyPerson !== "" &&
        email !== "" 
      ) {
        await createDesigner(formData).unwrap();
        setMessage({ text: "Successfully registered", variant: "success" });
        clearForm();
      } else {
        setMessage({
          text: "გთხოვთ შევსოთ ყველა ველი",
          variant: "info",
        });
      }
    } catch (error) {
      setMessage({
        text: "Technical issue, please try again",
        variant: "danger",
      });
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="px-0 registration-page">
      <SpaceComponent info={{ h1: t("registration") }} className="w-100" />
      <Row className="my-0 mx-0 ">
        <Col className="d-flex justify-content-center py-4 py-lg-5">
          <Form className="registration-form p-4 p-lg-5">
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                controlId="floatingInput"
                label={t("fullName")}
                className="mb-3"
              >
                <Form.Control
                  value={name.ge}
                  onChange={(e) => setName({ ge: e.target.value })}
                  type="text"
                  placeholder={t("fullName")}
                />
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={6} className="ps-lg-3">
              <InputGroup className="mb-3 d-flex flex-row">
                <Button
                  onClick={() => setCompanyPerson("person")}
                  className={`w-50 py-3 ${
                    companyPerson === "person" && "bg-secondary text-light"
                  }`}
                  variant="outline-secondary"
                >
                  {t("person")}
                </Button>
                <Button
                  onClick={() => setCompanyPerson("company")}
                  className={`w-50 ${
                    companyPerson === "company" && "bg-secondary text-light"
                  }`}
                  variant="outline-secondary"
                >
                  {t("company")}
                </Button>
              </InputGroup>
            </Col>
            {/* <div className="mb-3">
              <p>COMPANY / PERSON</p>
              <div className="d-flex gap-5">
                <Form.Check
                  variant="outline-secondary"
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
            </div> */}
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                controlId="floatingEmail"
                label={t("email")}
                className="mb-3"
              >
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={t("email")}
                />
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={6} className="ps-lg-3">
              <FloatingLabel
                controlId="floatingPhone"
                label={t("phoneNumber")}
                className="mb-3"
              >
                <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder={t("phoneNumber")}
                />
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                controlId="floatingProfilePhoto"
                label={
                  profilePhoto !== null && profilePhoto.size < maxSize
                    ? t("uploadedProfilePhoto")
                    : profilePhoto !== null && profilePhoto.size > maxSize
                    ? t("errorPhotoSize")
                    : t("uploadProfilePhoto")
                }
                className={`mb-3 upload-label ${
                  profilePhoto !== null && profilePhoto.size < maxSize
                    ? "green-border"
                    : ""
                }`}
              >
                <Form.Control
                  onChange={handleProfilePhotoChange}
                  type="file"
                  accept="image/*"
                />
                {/* {profilePhoto && (
                  <img
                    src={URL.createObjectURL(profilePhoto)}
                    alt="Profile Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )} */}
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={6} className="ps-lg-3">
              <FloatingLabel
                controlId="floatingProjectPhoto"
                label={
                  projectPhoto !== null && projectPhoto.size < maxSize
                    ? t("uploadedProjectsPhoto")
                    : projectPhoto !== null && projectPhoto.size > maxSize
                    ? t("errorPhotoSize")
                    : t("uploadProjectsPhoto")
                }
                className={`mb-3 upload-label ${
                  projectPhoto !== null && projectPhoto.size < maxSize
                    ? "green-border"
                    : ""
                }`}
              >
                <Form.Control
                  onChange={handleProjectPhotoChange}
                  type="file"
                  accept="image/*"
                />
                {/* {projectPhoto && (
                  <img
                    src={URL.createObjectURL(projectPhoto)}
                    alt="Project Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )} */}
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={4}>
              <FloatingLabel
                controlId="floatingBehance"
                label={companyPerson === 'company' ? "Company website" : 'Behance link'}
                className="mb-3"
              >
                <Form.Control
                  value={behance}
                  onChange={(e) => setBehance(e.target.value)}
                  type="url"
                  placeholder="Behance link"
                />
              </FloatingLabel>
            </Col>{" "}
            <Col sm={12} lg={4} className="px-lg-3">
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
            </Col>
            <Col sm={12} lg={4}>
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
            </Col>
            <Col
              sm={12}
              className="d-flex justify-content-center registration-page-designer-card mb-3"
            >
              <DesignerCardComponent
                name={name.ge}
                profilePhoto={profilePhoto}
                projectPhoto={projectPhoto}
                behance={behance}
                instagram={instagram}
                facebook={facebook}
              />
            </Col>
            <Col sm={12} lg={4} className="px-lg-3">
              <Button
                className="bg-black border-0 py-3 fw-bold registration-button w-100"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("submit")
                )}
              </Button>
            </Col>
            <Col sm={12}>
              {message.text && (
                <Alert variant={message.variant} className="mt-3">
                  {message.text}
                </Alert>
              )}
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
