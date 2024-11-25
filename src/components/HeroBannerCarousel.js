import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const slide1 = require("../images/union/hero-banner/slide3-b.jpg");


const HeroBannerCarousel = ({ data }) => {
  const {t, i18n} = useTranslation()
console.log(data)
  return (
    <Container className="carousel-container px-0" fluid>
      <Carousel
        className="h-100 hero-banner-carousel"
        autoPlay={true}
        touch={true}
      >
        {data &&
          data.map((el, i) => (
            <Carousel.Item key={i} className="bg-dark py-0 my-0">
              <Link
                to="/registration"
                className="carousel-item-inner-link-container py-0"
              >
                <div className="carousel-image-container">
                  <img className="carousel-image" src={el.image[0] || el.image.url} alt="" />
                </div>
                <Carousel.Caption className="px-2 py-2 py-md-3 pb-lg-4 d-flex flex-column justify-content-between align-items-center">
                  {/* <p>
                    {el.text ? el.text[i18n.language] : el.heroText[i18n.language]}
                  </p> */}
                  <p className="mb-0 h-100 d-flex align-items-center">{t("becomeMember")}</p>
                  <button className="heroBanner-registration-button px-3 px-lg-5">Click</button>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
};

export default HeroBannerCarousel;
