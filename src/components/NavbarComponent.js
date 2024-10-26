import React from "react";
import { Nav, Navbar, Offcanvas, Container } from "react-bootstrap";
import unionLogo from '../images/union/union-logo/union-logo.png'

const NavbarComponent = () => {
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary my-0 py-2">
      <Container fluid className="my-0">
        <Navbar.Brand className="ms-0 ms-lg-3" href="/"><img className="navbar-logo" src={unionLogo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          className="mb-0 w-sm-50 w-md-25"
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              MENU
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="mb-0">
            <Nav className="justify-content-end flex-grow-1 pe-3 column-gap-5">
              <Nav.Link href="/">MAIN</Nav.Link>
              <Nav.Link href="/news">NEWS</Nav.Link>
              <Nav.Link href="/designers">DESIGNERS</Nav.Link>
              <Nav.Link href="/projects">PROJECTS</Nav.Link>
              <Nav.Link href="/partners">PARTNERS</Nav.Link>
              <Nav.Link href="/contact">CONTACT</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
