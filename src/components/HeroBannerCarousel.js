import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const slide1 = require("../images/union/hero-banner/slide3-b.jpg");


const HeroBannerCarousel = ({ data }) => {
  const {t, i18n} = useTranslation()
console.log(data[0])
  return (
    <Container className="carousel-container px-0" fluid>
      <Carousel
        className="h-100 hero-banner-carousel"
        autoPlay={true}
        touch={true}
      >
        {data[0] &&
          data[0].map((el, i) => (
            <Carousel.Item key={i} className="bg-dark">
              <Link
                to="/somewhere"
                className="carousel-item-inner-link-container"
              >
                <div className="carousel-image-container">
                  <img className="carousel-image" src={el.image.url} alt="" />
                </div>
                <Carousel.Caption className="px-2">
                  {/* <h3>First slide label</h3> */}
                  <p>
                    {el.heroText[i18n.language]}
                  </p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
};

export default HeroBannerCarousel;
