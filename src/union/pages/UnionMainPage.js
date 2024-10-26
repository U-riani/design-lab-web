import React from "react";
import { Container } from "react-bootstrap";
// import HeroBanner from '../../components/HeroBanner'
import ProjectsComponent from "../../components/ProjectsComponent";
import NewsComponent from "../../components/NewsComponent";
import NewsComponent3 from "../../components/NewsComponent3";
// import PartnersComponent from '../../components/PartnersComponent'
import SpaceComponent from "../../components/SpaceComponent";
import {LastNewsProvider} from '../.././context/LastNewsContext'

const UnionMainPage = () => {
  return (
    <Container fluid className="px-0 mb-0">
      {/* <HeroBanner /> */}
      <ProjectsComponent />
      <SpaceComponent info={{ h1: "განსხვავებული", h3: "დიზაინი" }} />
      {/* <NewsComponent /> */}
      <LastNewsProvider>
        <NewsComponent3 />
      </LastNewsProvider>
      <SpaceComponent info={{ h1: "მომსახურება", h3: "პროდუქტები" }} />
      {/* <PartnersComponent /> */}
    </Container>
  );
};

export default UnionMainPage;
