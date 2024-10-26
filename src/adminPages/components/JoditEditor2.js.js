import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useCreateNewsMutation, useUpdateNewsMutation } from "../../data/newsSlice2";

const JoditEditorComponent2 = ({ prop }) => {
  const [title, setTitle] = useState(prop ? prop.title : "");
  const [imageFile, setImageFile] = useState(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

  useEffect(() => {
    if (prop) {
      setTitle(prop.title || "");
    }
  }, [prop]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    const editorContent = editorRef.current.value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", editorContent);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (prop && prop._id) {
        await updateNews({ id: prop._id, title, text: editorContent }).unwrap();
        alert("News updated successfully!");
      } else {
        await createNews(formData).unwrap();
        alert("News created successfully!");
      }
      setTitle("");
      setImageFile(null);
      editorRef.current.value = "";
      fileInputRef.current.value = "";
    } catch (error) {
      alert("Failed to save content: " + error.message);
    }
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "http://localhost:5000/api/upload", // Your image upload API endpoint
      format: "json",
      method: "POST",
      process: (resp) => {
        return {
          files: [resp.url], // Assuming your API returns an object with a 'url' field
        };
      },
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
    <div className="joditComponent-container">
      <h2>{prop && prop._id ? "Edit News Article" : "Create News Article"}</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter news title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-3"
      />
      <label htmlFor="image">Upload Image</label>
      <input
        id="image"
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="form-control mb-3"
      />
      <JoditEditor ref={editorRef} config={config} value={prop ? prop.text : ""} />
      <div className="mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">
          Save News Article
        </button>
        <button onClick={() => setTitle("")} className="btn btn-secondary ms-2">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditEditorComponent2;
