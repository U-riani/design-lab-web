import React from "react";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// const slide1 = require("../images/union/hero-banner/slide3-b.jpg");
import HeroBannerCarousel from "./HeroBannerCarousel";
import { useGetAllHerosQuery } from "../data/heroSlice";


const HeroBanner = () => {
  const data = [1, 2, 3]
  const {data: allHeros} = useGetAllHerosQuery();
  console.log(allHeros)
  return (
    <Container fluid className="hero-banner px-0 ">
      {allHeros && <HeroBannerCarousel data={allHeros}/>}
    </Container>
  );
};

export default HeroBanner;
