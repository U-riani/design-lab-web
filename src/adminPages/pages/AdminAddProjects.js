import React, { useRef, useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import {
  useGetAllProjectsQuery,
  useCreateProjectsMutation,
} from "../../data/projectsSlice";

const AdminAddProjects = () => {
  const { data: allProjects } = useGetAllProjectsQuery();
  const [createProjects] = useCreateProjectsMutation();
  const [heroes, setHeroes] = useState([
    { heroText: { ge: "", en: "" }, imageFile: null },
  ]);
  const [name, setName] = useState({ ge: "", en: "" });
  const [description, setDescription] = useState({ ge: "", en: "" });
  const [mainProject, setMainProject] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRefs = useRef([]);

  const handleHeroTextChange = (index, lang, value) => {
    const updatedHeroes = [...heroes];
    updatedHeroes[index].heroText[lang] = value;
    setHeroes(updatedHeroes);
  };

  const handleImageChange = (index, file) => {
    // Validate image type and size
    if (file && file.size > 5000000) {
      setStatusMessage({ type: "error", text: "File is too large. Max 5MB." });
      return;
    }
    if (file && !file.type.startsWith("image/")) {
      setStatusMessage({
        type: "error",
        text: "Invalid file type. Only images are allowed.",
      });
      return;
    }

    const updatedHeroes = [...heroes];
    updatedHeroes[index].imageFile = file;
    setHeroes(updatedHeroes);
  };
  console.log(allProjects);
  const addMoreHeroes = () => {
    setHeroes([...heroes, { heroText: { ge: "", en: "" }, imageFile: null }]);
  };
  // console.log(heroes)

  const handleSubmit = async () => {
    // Validate each hero’s text and image fields
    if (
      heroes.some(
        (hero) => !hero.heroText.ge || !hero.heroText.en || !hero.imageFile
      )
    ) {
      setStatusMessage({
        type: "error",
        text: "Please complete all fields for each hero.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("description[ge]", description.ge);
    formData.append("description[en]", description.en);
    formData.append("mainProject", mainProject);

    // Append each hero's data (text and image) to FormData
    heroes.forEach((hero, index) => {
      formData.append(`heroes[${index}][heroText][ge]`, hero.heroText.ge);
      formData.append(`heroes[${index}][heroText][en]`, hero.heroText.en);
      formData.append(`heroes[${index}][imageFile]`, hero.imageFile); // Append image for each hero
    });

    setIsLoading(true);
    try {
      await createProjects(formData).unwrap();
      setStatusMessage({
        type: "success",
        text: "Project created successfully!",
      });
      resetFormFields();
    } catch (error) {
      console.error("Error details:", error);
      setStatusMessage({ type: "error", text: "Failed to create project." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormFields = () => {
    setHeroes([{ heroText: { ge: "", en: "" }, imageFile: null }]);
    setName({ ge: "", en: "" });
    setDescription({ ge: "", en: "" });
    setMainProject(false);
    fileInputRefs.current.forEach((input) => (input.value = ""));
  };

  return (
    <Container className="mb-5">
      <Row>
        {statusMessage && (
          <Alert
            variant={statusMessage.type === "error" ? "danger" : "success"}
          >
            {statusMessage.text}
          </Alert>
        )}
        <Col xs={12}>
          <label htmlFor="add-ge-name">Project Name (Georgian)</label>
          <input
            value={name.ge}
            type="text"
            id="add-ge-name"
            onChange={(e) => setName({ ...name, ge: e.target.value })}
          />
          <label htmlFor="add-en-name">Project Name (English)</label>
          <input
            value={name.en}
            type="text"
            id="add-en-name"
            onChange={(e) => setName({ ...name, en: e.target.value })}
          />
        </Col>
        <Col xs={12} className="my-2">
          <label htmlFor="add-ge-description">
            Project Description (Georgian)
          </label>
          <textarea
            value={description.ge}
            rows={4}
            id="add-ge-description"
            onChange={(e) =>
              setDescription({ ...description, ge: e.target.value })
            }
          />
          <label htmlFor="add-en-description">
            Project Description (English)
          </label>
          <textarea
            value={description.en}
            rows={4}
            id="add-en-description"
            onChange={(e) =>
              setDescription({ ...description, en: e.target.value })
            }
          />
        </Col>

        {heroes.map((hero, index) => (
          <Col xs={12} key={index} className="mb-4">
            <label htmlFor={`add-ge-heroText-${index}`}>
              Hero Text (Georgian)
            </label>
            <input
              type="text"
              id={`add-ge-heroText-${index}`}
              value={hero.heroText.ge}
              onChange={(e) =>
                handleHeroTextChange(index, "ge", e.target.value)
              }
            />
            <label htmlFor={`add-en-heroText-${index}`}>
              Hero Text (English)
            </label>
            <input
              type="text"
              id={`add-en-heroText-${index}`}
              value={hero.heroText.en}
              onChange={(e) =>
                handleHeroTextChange(index, "en", e.target.value)
              }
            />
            <label htmlFor={`image-${index}`}>Upload Image</label>
            <input
              id={`image-${index}`}
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="form-control mb-3"
            />
          </Col>
        ))}

        <Col xs={12}>
          <Button variant="outline-secondary" onClick={addMoreHeroes}>
            Add More Heroes
          </Button>
        </Col>

        <Col xs={12} className="d-flex align-items-center py-2 mt-3">
          <label className="me-2" htmlFor="mainProject">
            Main Project
          </label>
          <input
            id="mainProject"
            type="checkbox"
            checked={mainProject}
            onChange={() => setMainProject(!mainProject)}
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

export default AdminAddProjects;
