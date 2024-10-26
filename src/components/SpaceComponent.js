import React from "react";
import { Container } from "react-bootstrap";

const SpaceComponent = ({ info }) => {
  return (
    <Container fluid className="space-component py-3">
      {info && (
        <div className="spaceComponent-text-container px-3">
          <h1>{info.h1}</h1>
          <h3>{info.h3}</h3>
        </div>
      )}
    </Container>
  );
};

export default SpaceComponent;
