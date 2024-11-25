import React from "react";
import { Container, Row } from "react-bootstrap";

const SpaceComponent = ({ info }) => {
  return (
    <Container fluid className="space-component p-0 pt-5 mb-0">
      <Row  className="space-component-inner-container ms-0 pt-2 pt-lg-5 pb-1 mb-0">
        {info && (
          <div className="spaceComponent-text-container p-0 mb-0">
            <h1 className="ps-3 pt-2 align"><span>{info.h1}</span></h1>
            {/* {info.h3 && <h3>{info.h3}</h3>} */}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default SpaceComponent;
