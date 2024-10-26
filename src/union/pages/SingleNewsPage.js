import React from "react";
import { Spinner, Alert, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetSingleNewsQuery } from "../../data/newsSlice2";

const GetSingleNews = () => {
  const { newsId } = useParams();

  const { data: news, error, isLoading } = useGetSingleNewsQuery(newsId);
  console.log(news);

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
      {news?.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-article mb-4">
          <Row>
            <h1 className="text-center">{news.title}</h1>
          </Row>

          {/* <img src={news.image} alt={news.title} className="img-fluid" /> */}
          <Row className="single-news-image-row">{news.image && <img src={`/${news.image}`} alt="news" />}</Row>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: news.text }}
          />
        </div>
      )}
    </Container>
  );
};

export default GetSingleNews;
