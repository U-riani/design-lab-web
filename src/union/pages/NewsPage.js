import React, { useEffect } from "react";
import he from "he";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../data/newsSlice2";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../context/LocalStorageContext";
import SpaceComponent from "../../components/SpaceComponent";

const NewsPage = () => {
  const { data: serverNewsData, isLoading, error } = useGetAllNewsQuery();
  const { t, i18n } = useTranslation();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const newsData = localStorageData.allNews;

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // Load data from server and update localStorage if data has changed
  useEffect(() => {
    if (serverNewsData && isDataDifferent(newsData, serverNewsData)) {
      updateLocalStorageData("allNews", serverNewsData);
    }
  }, [serverNewsData]);

  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    return he.decode(textOnly);
  };

  if (!newsData && isLoading) {
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
    <Container fluid className="newsPage px-0">
      <SpaceComponent info={{ h1: t("news") }} className="w-100" />
      <Row className="newsPage-row newsPage-row-2 px-md-4 mt-3 mt-md-4 mt-lg-5">
        {newsData &&
          newsData.map((el, i) => (
            <Col
              xs={12}
              key={i}
              className={`py-3 px-md-4 pb-md-4 mb-3 mb-md-4 mb-lg-5 newsPage-col newsPage-col-${
                i + 1
              }`}
            >
              <div
                className={`newsPage-col-inner-container newsPage-col-inner-container-${
                  i + 1
                } mb-0`}
              >
                <div
                  className={`newspage-text-image-container newspage-text-image-container-${
                    i + 1
                  } mb-0`}
                >
                  <Col
                    xs={6}
                    sm={7}
                    md={5}
                    className={`newsPage-news-text-container newsPage-news-text-container-${
                      i + 1
                    } pe-3 mb-0`}
                  >
                    <div className="h-100 mb-3 newsPage-news-title-text-container">
                      <h5>
                        {el.title[i18n.language] || el.title.ge || "News Title"}
                      </h5>
                      <div className="newsPage-paragraph">
                        {extractTextRegex(
                          el.text[i18n.language] || "news not found"
                        )}
                      </div>
                    </div>

                    <Button
                      as={Link}
                      to={`${el._id}`}
                      className="newsPage-see-more-button rounded-0 bg-dark border-0 newsPage-button pt-2"
                    >
                      <span>{t("more")}</span>
                      <em></em>
                    </Button>
                  </Col>

                  <Col
                    xs={6}
                    sm={5}
                    md={6}
                    className={`newsPage-image-container newsPage-image-container-${
                      i + 1
                    } mb-0 `}
                  >
                    <img src={el.images[0]} alt="news" />
                  </Col>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default NewsPage;
