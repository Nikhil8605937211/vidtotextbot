import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'; // Import Link for routing
import "./Navbar.css";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { SiProbot } from "react-icons/si"; // Using a more detailed robot icon

function NavbarH() {
  return (
    <>
      <nav>
        <Navbar expand="lg" className="navd ">
          <Container fluid>
            <Navbar.Brand><Link to="/" className="logo-text">
            <div className="logo-text">
                <span className="play-icon">
                  <MdOutlinePlayCircleFilled />
                </span>
                Vi<span className="d-icon">d</span>
                <span className="text-highlight">Text</span>
                B
                <span className="robot-icon">
                  <SiProbot />
                </span>
                <span className="t-icon">t</span>
              </div>
            </Link>
             
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto navs">
                {/* Use Link instead of span for routing */}
                <Link to="/" className="navitem">Home</Link>
            
                <Link to="/convert" className="navitem">Convert</Link>
               
                <Link to="/about" className="navitem">About</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </>
  );
}

export default NavbarH;
