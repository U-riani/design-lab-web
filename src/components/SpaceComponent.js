import React from "react";
import { Container, Row } from "react-bootstrap";

const SpaceComponent = ({ info }) => {
  return (
    <Container fluid className="space-component p-0 py-4 py-lg-5 mb-0">
      <Row  className="space-component-inner-container ms-0 py-3 mb-0">
        {info && (
          <div className="spaceComponent-text-container p-0 mb-0">
            <h1 className="ps-3">{info.h1}</h1>
            {info.h3 && <h3>{info.h3}</h3>}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default SpaceComponent;
