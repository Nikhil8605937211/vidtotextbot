import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Loader.css'; // Your CSS file for loader styles
import logo from '../assests/main-project-logo.png';

import { dotWave } from 'ldrs'; // Import the ldrs library
dotWave.register(); // Register the dotWave animation

const Loader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error, url, videoTitle, vid } = location.state || {};  // Include vid if needed

  useEffect(() => {
    if (isLoading === false) {
      if (error) {
        // If there was an error, navigate back to the convert page with previous URL and videoTitle
        setTimeout(() => {
          navigate('/convert', { state: { url, videoTitle } }); // Pass URL and title back to the convert page
        }, 2010); // Delay the redirection to show the error message
      } else if (vid) {
        // If there's no error and vid exists (i.e., data fetched successfully), navigate to the /ask page
        setTimeout(() => {
          navigate('/ask'); // Redirect to the /ask page after a successful fetch
        }, 2510); // Delay redirection to show success or loading message
      }
    }
  }, [isLoading, error, url, videoTitle, vid, navigate]);  // Trigger useEffect when isLoading or error state changes

  return (
    <div className="loader-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      {isLoading ? (
        <div className="progress-bar-container">
          <l-dot-wave size="67" speed="1" color="black"></l-dot-wave>  {/* Show custom loading animation */}
          <p>Loading, please wait...</p>  {/* Show loading text along with animation */}
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <p>Video added successfully! Redirecting to the Ask page...</p>
      )}
    </div>
  );
};

export default Loader;
