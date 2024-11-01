import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  useCreateNewsMutation,
  useGetSingleNewsQuery,
  useUpdateNewsMutation,
} from "../../data/newsSlice2";
import { useParams } from "react-router-dom";

const JoditEditorComponent = (prop) => {
  // const {newsId} = useParams();

  // console.log(newsId);
  // const {data: news, isLoading, error} = useGetSingleNewsQuery(newsId)
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [createNews] = useCreateNewsMutation();
  // const [updateNews] = useUpdateNewsMutation();

  // useEffect(() => {
  //   if (news) {
  //     setTitle(news.title);
  //     setEditorContent(news.text);
  //   }
  //   console.log(news);
  // }, [news]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", editorContent);
    if (imageFile) formData.append("image", imageFile);
    console.log(formData);

    try {
      // Create new article
      await createNews(formData).unwrap();

      alert("News saved successfully!");
      handleClearContent();
    } catch (error) {
      console.log("error", error);
      alert("Failed to save content: " + error.message);
    }
  };

  const handleClearContent = () => {
    setTitle("");
    setImageFile(null);
    setEditorContent("");
    fileInputRef.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-backend.vercel.app/api/upload",
      format: "json",
      method: "POST",
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
    <div className="joditComponent-container">
      {/* <h2>{news ? "Edit News Article" : "Create News Article"}</h2> */}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter news title"
        value={title}
        onChange={handleTitleChange}
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
      <JoditEditor
        ref={editorRef}
        value={editorContent}
        config={config}
        onBlur={(newContent) => setEditorContent(newContent)} // Update state on blur
      />
      <div className="mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">
          Save News Article
        </button>
        <button onClick={handleClearContent} className="btn btn-secondary ms-2">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditEditorComponent;
