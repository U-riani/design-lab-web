import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StackCardsSlider4 from "./StackCardsSlider4";
import { LastNewsContext } from "../context/LastNewsContext";
import { useTranslation } from "react-i18next";
import SpaceComponent from "./SpaceComponent";
// import { useGetLast5NewsQuery } from "../data/newsSlice2";

const NewsComponent3 = () => {
  const { last5News } = useContext(LastNewsContext);
  const { t, i18n } = useTranslation();
  // const {data} = useGetLast5NewsQuery()
  // useEffect(() => {
  //   console.log(data)
  // } , [last5News])
  // console.log(last5News);
  return (
    <Container fluid className="news-component pb-5 mb-0 px-0">
      <SpaceComponent info={{ h1: t("news") }} />

      <Row className="newsComponent-inner-container px-0 pb-0 pb-lg-5">
        <Col xs={3} sm={3} className="newsComponent-left-col pe-0 ps-0 mb-0">
          <div className="newsComponent-carouse-text-container">
            {last5News &&
              last5News.map((el, i) => (
                <h4
                  className={`ps-2 newsComponent-carouse-text ${
                    el.activeNews === 0
                      ? "newsComponent-carouse-active-text"
                      : ""
                  }`}
                  key={i}
                >
                  {el.title[i18n.language] || el.title}
                </h4>
              ))}
            {/* <h4>{activeNews && activeNews[0].text}</h4> */}
          </div>

          <div className="newsComponent-see-more-button-col mt-auto">
            <button className="see-more">
              <Link className="see-more-link px-3 py-2 py-sm-3" to="/news">
                <span>more</span>
                <em></em>
              </Link>
            </button>
          </div>
        </Col>
        <Col
          xs={9}
          sm={9}
          className="newsComponent-carousel-container ps-0 mb-0"
        >
          {/* <StackCardsSlider3 newsData={newsData} /> */}
          <StackCardsSlider4 newsData={last5News} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsComponent3;
