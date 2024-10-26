import React, { useState } from "react";
import { Spinner, Alert, Container, Row, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleNewsQuery,
  useDeleteNewsMutation,
} from "../../data/newsSlice2";
// import JoditEditorComponent from "../components/JoditEditor";
import JoditEditorComponent2 from '../components/JoditEditor2.js'

const AdminSingleNews = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const [deleteNews] = useDeleteNewsMutation();
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      console.log("News deleted successfully");
      navigate("/admin/all-news");
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const confirmDelete = () => {
    handleDelete(newsId);
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

  if (isLoading) {
    return (
      <Container className="getNewsComponent text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="getNewsComponent">
        <Alert variant="danger">Error fetching news: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="getNewsComponent">
      {!news ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-article mb-4">
          <Row>
            <h1 className="text-center">{news.title}</h1>
          </Row>
          <Row className="single-news-image-row">
            {news.image && <img src={`/${news.image}`} alt="news" />}
          </Row>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: news.text }}
          />
          {showEditor && (
            <Row>
              <JoditEditorComponent2 prop={news} />
            </Row>
          )}
          <Row>
            <div className="admin-buttons-container d-flex justify-content-around">
              <Button
                onClick={() => setShowEditor(true)}
                className="text-dark rounded-0 bg-info border-0"
              >
                UPDATE
              </Button>
              <Button
                className="text-light rounded-0 bg-danger border-0"
                onClick={() => setShowAlert(true)}
              >
                DELETE
              </Button>
            </div>
          </Row>
          {showAlert && (
            <Alert variant="warning" className="mt-3">
              <Alert.Heading>Are you sure?</Alert.Heading>
              <p>This action cannot be undone. Please confirm if you want to proceed.</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={cancelDelete} className="me-2">
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Confirm
                </Button>
              </div>
            </Alert>
          )}
        </div>
      )}
    </Container>
  );
};

export default AdminSingleNews;
