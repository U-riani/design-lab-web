import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  useCreateNewsMutation,
  useGetSingleNewsQuery,
  useUpdateNewsMutation,
} from "../../data/newsSlice2";
import { useParams } from "react-router-dom";

const JoditUpdateEditor = (prop) => {
  const { newsId } = useParams();

  // console.log(newsId);
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

//   const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

//   useEffect(() => {
//     if (data) {
//         console.log(data);
//     }
//   }, [data]);


  useEffect(() => {
    if (news) {
      setTitle(news.title);
      setEditorContent(news.text);
      setEditorContent(news.text);
      setImageFile(news.image);
    }
  }, [news]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (news) {
        await updateNews({
          id: news._id,
          title,
          text: editorContent,
          image: imageFile ? imageFile : null,
        }).unwrap();
      }
      alert("News updated successfully!");
      handleClearContent();
    } catch (error) {
      console.log("error", error, error.message);
      alert("Failed to update content joditUpdate: " + error.message);
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
      <h2>Edit News Article</h2>
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
          Update News Article
        </button>
        <button onClick={handleClearContent} className="btn btn-secondary ms-2">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditUpdateEditor;
