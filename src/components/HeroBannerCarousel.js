import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
const slide1 = require("../images/union/hero-banner/slide3-b.jpg");

const HeroBannerCarousel = ({ data }) => {
  return (
    <Container className="carousel-container px-0" fluid>
      <Carousel
        className="h-100 hero-banner-carousel"
        autoPlay={true}
        touch={true}
      >
        {data &&
          data.map((el, i) => (
            <Carousel.Item key={i} className="bg-dark">
              <Link
                to="/somewhere"
                className="carousel-item-inner-link-container"
              >
                <div className="carousel-image-container">
                  <img className="carousel-image" src={slide1} alt="" />
                </div>
                <Carousel.Caption className="px-2">
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
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
