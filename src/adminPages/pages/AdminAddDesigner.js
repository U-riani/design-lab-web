import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useCreateDesignerMutation } from "../../data/designersSlice2";

const AdminAddDesigner = () => {
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();
  const [name, setName] = useState({ ge: "", en: "" });
  const [text, setText] = useState({ ge: "", en: "" });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyPerson, setCompanyPerson] = useState("person");

  const handleProfilePhotoChange = (e) => {
    if (e.target.files) setProfilePhoto(e.target.files[0]);
  };

  const handleProjectPhotoChange = (e) => {
    if (e.target.files) setProjectPhoto(e.target.files[0]);
  };

  const handleCompanyPersonChange = (e) => {
    setCompanyPerson(e.target.value);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);
    formData.append("activeStatus", "true");

    if (profilePhoto) formData.append("images", profilePhoto);
    if (projectPhoto) formData.append("images", projectPhoto);

    try {
      await createDesigner(formData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col className="d-flex justify-content-center">
          <Form className="registration-form">
            <FloatingLabel
              controlId="floatingInput"
              label="სრული სახელი"
              className="mb-3"
            >
              <Form.Control
                value={name.ge}
                onChange={(e) => handleNameChange('ge', e)}
                type="text"
                placeholder="Full name"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Full name ENG"
              className="mb-3"
            >
              <Form.Control
                value={name.en}
                onChange={(e) => handleNameChange('en', e)}
                type="text"
                placeholder="Full name ENG"
              />
            </FloatingLabel>

            <textarea
              value={text.ge}
              rows={3}
              onChange={(e) => handleTextChange('ge', e)}
              type="text"
              placeholder="ქართ ტექსტი"
              className="mb-3"
            />

            <textarea
              rows={3}
              value={text.en}
              onChange={(e) => handleTextChange('en', e)}
              type="text"
              placeholder="TEXT ENG"
              className="mb-3"
            />

            <div className="mb-3">
              <p>COMPANY / PERSON</p>
              <Form.Check
                type="radio"
                label="Company"
                name="companyPerson"
                value="company"
                checked={companyPerson === "company"}
                onChange={handleCompanyPersonChange}
              />
              <Form.Check
                type="radio"
                label="Person"
                name="companyPerson"
                value="person"
                checked={companyPerson === "person"}
                onChange={handleCompanyPersonChange}
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

            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddDesigner;
