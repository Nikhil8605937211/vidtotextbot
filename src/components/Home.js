import React from 'react';
import './Home.css'; // Import your CSS file for styles
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Bootstrap components
import robotImage from '../assests/robot.png'; // Import your robot image
import demoImage from '../assests/mobileRo.png'; // Import your demo image
import About from './About'; // Adjust path as necessary
import Convervtt from './Convervtt'; // Adjust path as necessary
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom'; // Import Link for routing

function Home() {
    return (
        <>
            <Container fluid className="home-container">
                <Container fluid>
                    <Row>
                        <Col lg={12} className="text-center demo-imagecontain">
                            <img src={demoImage} alt="Demo" className="demo-image img-fluid" />
                        </Col>
                    </Row>
                </Container>

                <Row className="justify-content-center align-items-center">
                    <Col md={12} className="text-center quote-container">
                        <h3>
                            <Typewriter
                                options={{
                                    strings: [
                                        'Transforming your <span id="vid">videos</span> into words.',
                                        'Let your <span id="vid">stories</span> speak without a sound.',
                                        'Transforming your <span id="vid">memories</span> into text with ease.'
                                    ],
                                    autoStart: true,
                                    cursor: "|",
                                    typeSpeed: 50,
                                    backSpeed: 25,
                                    loop: true,
                                }}
                            />
                        </h3>
                        <p>"Experience the magic of video to text processing."</p>
                        <p>"Let your videos speak without a sound."</p>
                        <Link to="/convert">
                            <Button className="start-button" variant="primary">Start</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <img src={robotImage} alt="Robot" className="robot-image img-fluid" />
                    </Col>
                </Row>
            </Container>

            <About />
            {/* <Convervtt /> */}
        </>
    );
}

export default Home;
