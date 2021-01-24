import React from "react";
import { Form, Button, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useAuth } from "../../firebase/auth";
import NavBarContainer from "./NavBarContainer";

export const NavBar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <NavBarContainer>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <h3>Dessert-Storm</h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="NavSurch" inline>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          <Nav className="mr-auto"></Nav>

          <Nav className="NavDropdown">
            <Image src={currentUser.photoURL} roundedCircle />

            <NavDropdown
              title={currentUser.displayName}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another actiona
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavBarContainer>
  );
};
export default NavBar;
