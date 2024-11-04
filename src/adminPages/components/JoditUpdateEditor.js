import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useGetSingleNewsQuery, useUpdateNewsMutation } from "../../data/newsSlice2";
import { useParams } from "react-router-dom";

const JoditUpdateEditor = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const [titleGe, setTitleGe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [existingImages, setExistingImages] = useState([]); // Store existing images
  const [newImages, setNewImages] = useState([]); // Store new images to be added
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const editorRefGe = useRef(null);
  const editorRefEn = useRef(null);
  const fileInputRef = useRef(null);

  const [updateNews] = useUpdateNewsMutation();

  useEffect(() => {
    if (news) {
      setTitleGe(news.title.ge);
      setTitleEn(news.title.en);
      setEditorContentGe(news.text.ge);
      setEditorContentEn(news.text.en);
      setExistingImages(news.images || []);
    }
  }, [news]);

  const handleTitleEnChange = (e) => setTitleEn(e.target.value);
  const handleTitleGeChange = (e) => setTitleGe(e.target.value);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    try {
      await updateNews({
        id: news._id,
        title: { ge: titleGe, en: titleEn },
        text: { ge: editorContentGe, en: editorContentEn },
        images: newImages
        // Send newly uploaded images
      }).unwrap();
      alert("News updated successfully!");
      handleClearContent();
    } catch (error) {
      console.log("Error:", error.message);
      alert("Failed to update content: " + error.message);
    }
  };

  const handleClearContent = () => {
    setTitleEn("");
    setTitleGe("");
    setNewImages([]);
    setEditorContentGe("");
    setEditorContentEn("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-backend.vercel.app/api/upload",
      format: "json",
      method: "POST",
      process: (resp) => ({ files: [resp.url] }),
    },
    buttons: ["bold", "italic", "underline", "link", "ul", "ol", "image", "align", "undo", "redo", "hr"],
    minHeight: 400,
  };

  return (
    <div className="joditComponent-container">
      <h2>Edit News Article</h2>
      
      <label htmlFor="titleGe">Title (Georgian)</label>
      <input
        id="titleGe"
        type="text"
        placeholder="Enter news title (Georgian)"
        value={titleGe}
        onChange={handleTitleGeChange}
        className="form-control mb-3"
      />

      <label htmlFor="image">Upload Images</label>
      <input
        id="image"
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleImageChange}
        className="form-control mb-3"
      />

      {/* Display existing and new images */}
      <div className="gela">
        <h5>Existing Images:</h5>
        {existingImages.map((img, index) => (
          <img key={index} src={img} alt="Existing" style={{ width: "200px", margin: "10px" }} />
        ))}
        <h5>New Images:</h5>
        {newImages.map((file, index) => (
          <img key={index} src={URL.createObjectURL(file)} alt="New" style={{ width: "200px", margin: "10px" }} />
        ))}
      </div>

      <label>Content (Georgian)</label>
      <JoditEditor
        ref={editorRefGe}
        value={editorContentGe}
        config={config}
        onBlur={(newContent) => setEditorContentGe(newContent)}
      />

      <label htmlFor="titleEn">Title (English)</label>
      <input
        id="titleEn"
        type="text"
        placeholder="Enter news title (English)"
        value={titleEn}
        onChange={handleTitleEnChange}
        className="form-control mb-3"
      />

      <label>Content (English)</label>
      <JoditEditor
        ref={editorRefEn}
        value={editorContentEn}
        config={config}
        onBlur={(newContent) => setEditorContentEn(newContent)}
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
