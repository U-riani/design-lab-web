// src/adminPages/components/AdminNavbar.js
import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
              <NavDropdown.Item href="/admin/add-news">ADD</NavDropdown.Item>
              <NavDropdown.Item href="/admin/all-news">All NEWS</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              {/* ...other dropdown items */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
