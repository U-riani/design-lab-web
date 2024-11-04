import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
// import HeroBanner from "../../components/HeroBanner";
import {
  useGetAllDesignersQuery,
  useCreateDesignerMutation,
} from "../../data/designersSlice2";

const AdminAddDesigner = () => {
  const { data: allDesigners } = useGetAllDesignersQuery();
  const [createDesigner] = useCreateDesignerMutation();
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [behance, setBehance] = useState('')
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  console.log(allDesigners);

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
    if (!text.ge || !text.en) {
      setStatusMessage({
        type: "error",
        text: "Please fill in both text fields.",
      });
      return;
    }
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("images", imageFile);

    setIsLoading(true);
    try {
      await createDesigner(formData).unwrap();
      setStatusMessage({ type: "success", text: "Partner created successfully!" });
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create partner:", error);
      setStatusMessage({ type: "error", text: "Failed to create partner." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mb-5">
      <Row>
        {/* <HeroBanner /> */}
      </Row>
      <Row>
        {statusMessage && (
          <Alert
            variant={statusMessage.type === "error" ? "danger" : "success"}
          >
            {statusMessage.text}
          </Alert>
        )}
        <Col xs={12}>
          <label htmlFor="add-image">Add image</label>
          <input type="file" id="add-image" onChange={handleImageChange} />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-ge-name">Add Georgian name</label>
          <input
            value={name.ge}
            type="text"
            id="add-ge-name"
            onChange={(e) => handleNameChange("ge", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-en-name">Add English name</label>
          <input
            value={name.en}
            type="text"
            id="add-en-name"
            onChange={(e) => handleNameChange("en", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-ge-text">Add Georgian text</label>
          <input
            value={text.ge}
            type="text"
            id="add-ge-text"
            onChange={(e) => handleTextChange("ge", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-en-text">Add English text</label>
          <input
            value={text.en}
            type="text"
            id="add-en-text"
            onChange={(e) => handleTextChange("en", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="facebook">Add facebook URL</label>
          <input
            value={facebook}
            type="text"
            id="facebook"
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="instagram">Add Instagram URL</label>
          <input
            value={instagram}
            type="text"
            id="instagram"
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="behance">Add Behance URL</label>
          <input
            value={behance}
            type="text"
            id="behance"
            onChange={(e) => setBehance(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Button className="mt-3" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddDesigner;
