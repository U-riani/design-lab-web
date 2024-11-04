// src/adminPages/components/AdminNavbar.js
import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const AdminNavbar = () => {
  const { logout } = useAuth(); // Access the logout function
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    logout(navigate); // Pass navigate to logout
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="NEWS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/add-news">
                ADD
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/all-news">
                All NEWS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="HERO" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/add-hero">
                ADD HERO
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/all-heros">
                All HEROS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="PARTNERS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-partner">
                ADD PARTNERS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-partners">
                ALL PARTNERS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="DESIGNERS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-designer">
                ADD DESIGNER
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-designers">
                ALL DESIGNERS
              </NavDropdown.Item>
              {/* ...other dropdown items */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={handleLogout} variant="outline-danger">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
