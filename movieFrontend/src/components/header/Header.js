// Header.js
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import { AuthContext } from '../provider/AuthProvider';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { auth, logout } = useContext(AuthContext);


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ "color": 'gold' }}>
          <FontAwesomeIcon icon={faVideoSlash} />Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
        </Nav>
        </Navbar.Collapse>
              {auth ? (
          <>
            <Navbar.Text className="me-2 fw-bold">
              {auth.username}
            </Navbar.Text>
            <Button variant="outline-info" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant="outline-info" className="me-2" onClick={() => setShowLogin(true)}>Login</Button>
            <Button variant="outline-info" onClick={() => setShowRegister(true)}>Register</Button>
          </>
        )}
      </Container>

      <Login show={showLogin} handleClose={() => setShowLogin(false)} />

      <Register show={showRegister} handleClose={() => setShowRegister(false)} />
    </Navbar>
  );
}

export default Header;
