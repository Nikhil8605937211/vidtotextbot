import React, { useEffect, useState } from 'react';
import './About.css'; // Make sure to create this CSS file for styling
import aboutusbot from '../assests/aboutusbot.png';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function About() {
  const [fadeIn, setFadeIn] = useState(false);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    // Reset the fadeIn state each time the component mounts
    setFadeIn(false);
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Adding a slight delay before applying the fade-in class

    return () => clearTimeout(timeout); // Cleanup the timeout on unmount
  }, [location]); // Depend on location to rerun this effect on navigation

  return (
    <Container fluid>
      <div className={`HeroSection_hero mt-5 ${fadeIn ? 'fade-in' : ''}`} id="hero-section">
        <div className="HeroSection_hero-container">
          <div className="HeroSection_texts">
            <h1>
              Join the AI revolution with <span className="HeroSection_gradient-span">VidtotextBot</span>
            </h1>
            <p>
              <i>
                Discover the smarter way to explore YouTube videos with our advanced transcription technology. 
                You can teach and learn from your own bot and get instant answers to your video queries. Plus,
                we are always working on new updates and features to make your video exploration even better. Stay tuned!
              </i>
            </p>
            <Link to="/convert" className="HeroSection_buttons">
              Try Now
            </Link>
          </div>
          <div className="HeroSection_image-container">
            <img src={aboutusbot} alt="Bot" className='mb-5 move-up-down' />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default About;
