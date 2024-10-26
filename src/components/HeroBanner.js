import React from "react";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// const slide1 = require("../images/union/hero-banner/slide3-b.jpg");
import HeroBannerCarousel from "./HeroBannerCarousel";


const HeroBanner = () => {
  const data = [1, 2, 3]
  return (
    <Container fluid className="hero-banner px-0 ">
      <HeroBannerCarousel data={data}/>
    </Container>
  );
};

export default HeroBanner;
