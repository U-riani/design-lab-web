import React, { useState } from "react";
import { Nav, Navbar, Offcanvas, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import unionLogo from "../images/union/union-logo/union-logo.png";
import { useTranslation } from "react-i18next";

const NavbarComponent = () => {
  const flagGe = require("../images/flags/georgia.png");
  const flagUk = require("../images/flags/uk.png");
  const { t, i18n } = useTranslation();

  // const [showflag, setShowFlag] = useState(flagGe);
  const [toggleLang, setTogglelang] = useState(localStorage.getItem('language') || i18n.language);
  // const []

  const handleLangChange = (lang) => {
    setTogglelang(i18n.language === "ge" ? "en" : "ge");
    i18n.changeLanguage(toggleLang === "ge" ? "en" : "ge");
    localStorage.setItem('language',  toggleLang === "ge" ? "en" : "ge");

  };

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary my-0 py-2">
      <Container fluid className="my-0">
        <Navbar.Brand className="ms-0 ms-lg-3" as={Link} to="/">
          <img className="navbar-logo" src={unionLogo} alt="Union Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          className="mb-0 w-sm-50 w-md-25"
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              {t("menu")}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="mb-0">
            <Nav className="justify-content-end flex-grow-1 pe-3 column-gap-3 column-gap-lg-1 column-gap-xl-3 column-gap-xxl-4">
              <Nav.Link as={Link} to="/">
              {t("main")}
              </Nav.Link>
              <Nav.Link as={Link} to="/news">
              {t("news")}              </Nav.Link>
              <Nav.Link as={Link} to="/designers">
              {t("designers")}
              </Nav.Link>
              <Nav.Link as={Link} to="/projects">
              {t("projects")}
              </Nav.Link>
              <Nav.Link as={Link} to="/partners">
              {t("partners")}
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
              {t("contact")}
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
              <Button
                onClick={() => handleLangChange()}
                className="p-1 py-1 border-0 flag-button"
              >
                <img src={toggleLang === 'en' ? flagUk : flagGe} />
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
