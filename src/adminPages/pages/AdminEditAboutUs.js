import React, { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../data/aboutUsSlice";
import { Col, Container, Row } from "react-bootstrap";

const JoditEditor = React.lazy(() => import("jodit-react"));

const AdminEditAboutUs = () => {
  const { data, isLoading, error } = useGetAboutUsQuery();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [oldImageSrc, setOldImageSrc] = useState("");
  const [id, setId] = useState(null);

  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setEditorContentGe(data[0].text.ge);
      setEditorContentEn(data[0].text.en);
      setOldImageSrc(data[0].image[0]);
      setId(data[0]._id);
    }
  }, [data]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    // console.log(imageFile);
  };

  const handleSubmit = async () => {
    try {
      //   const formData = new FormData();
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;
      //   if (imageFile) {
      //     formData.append("images", imageFile); // Append images for upload
      //   }
      //   formData.append("text[en]", enText);
      //   formData.append("text[ge]", geText);
    //   console.log(imageFile);
      const response = await updateAboutUs({
        id,
        enText,
        geText,
        imageFile,
      }).unwrap();
    //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

//   console.log(data);
  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-backend.vercel.app/api/upload",
      format: "json",
      method: "PATCH",
      process: (resp) => ({
        files: [resp.url],
      }),
    },
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "ul",
      "ol",
      "image",
      "align",
      "undo",
      "redo",
      "hr",
    ],
    minHeight: 400,
  };
  return (
    <Container className="pt-5 admin-about-us">
      <h2 className="pb-3">განაახლე ჩვენს შესახებ</h2>
      <Col sm={8}>
        <div className="h-50 admin-about-us-image-container">
          <img className="object-cover w-100 h-100" src={oldImageSrc} alt="" />
        </div>
      </Col>
      <div className="my-3">
        <label htmlFor="image">Upload Images</label>
        <input
          id="image"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="form-control mb-3"
        />
      </div>
      <div className="admin-add-about-us-jodit-container">
        <label>Content (Georgian)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefGe}
            value={editorContentGe}
            config={config}
            onBlur={(newContent) => setEditorContentGe(newContent)}
          />
        </Suspense>
      </div>
      <div className="admin-add-about-us-jodit-container">
        <label>Content (English)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefEn}
            value={editorContentEn}
            config={config}
            onBlur={(newContent) => setEditorContentEn(newContent)}
          />
        </Suspense>
      </div>
      <div>
        <button onClick={handleSubmit}>add</button>
      </div>
    </Container>
  );
};

export default AdminEditAboutUs;
