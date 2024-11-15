import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import axios from 'axios';
import "./Convervtt.css"; // Your CSS file for styles

function Convervtt() {
  const [videoTitle, setVideoTitle] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle the API request and simulate loading progress
  const handleSubmit = async () => {
    setMessage(''); // Reset the message
    navigate('/loader', { state: { isLoading: true, error: '' } }); // Navigate to loader page with loading state

    try {
      const formData = new FormData();
      formData.append('video_title', videoTitle);
      formData.append('url', url);

      const response = await axios.post('https://relaxing-safely-leech.ngrok-free.app/add_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { vid, message } = response.data;

      if (message !== undefined) {
        // Store the vid in local storage
        localStorage.setItem('vid', vid);

        // Set success message and navigate to the ask page
        setMessage('Video added successfully! Redirecting to the chat page...');
        navigate('/ask');
      } else {
        // Set error message if no message from the API
        setMessage('Failed to add video. Please try again.');
        navigate('/loader', { state: { isLoading: false, error: 'Failed to add video. Please try again.', url, videoTitle } });
      }
    } catch (error) {
      // Handle API request failure
      setMessage('There was an error submitting the form. Please try again.');
      navigate('/loader', { state: { isLoading: false, error: 'There was an error submitting the form. Please try again.', url, videoTitle } });
    }
  };

  return (
    <div className="converter-container mt-5">
      <h5 className="converter-title">Convert Your <span id="vidT">Video</span> to Text</h5>
      <p className="converter-subtitle">ANYTHING ASK FROM YOUR VIDEO,</p>
      <div className="row upload-section">
        <div className="col-12 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Upload YouTube link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-primary">
              Paste
            </button>
          </div>
        </div>

        <div className="col-12 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your Video title here"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleSubmit}>
              Title
            </button>
          </div>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Generate
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Convervtt;
