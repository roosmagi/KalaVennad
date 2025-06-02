import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">KalaVennad</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/addfish">Lisa kala</Nav.Link>
        </Nav>
        <Nav>
          {token ? (
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button variant="outline-light" as={Link} to="/login">Login</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
