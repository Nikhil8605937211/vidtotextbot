import React, { useState, useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md'; // Send icon
import { FaUserAlt, FaRobot } from 'react-icons/fa'; // User and Bot icons
import axios from 'axios';
import './AskQ.css';
import chatbot from '../assests/chat-page-bot.png';

const AskQ = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Manage loading state
  const [apiResponse, setApiResponse] = useState(null); // State to store GET response
  const defaultMessageSentRef = useRef(false); // Ref to track if the default message is sent

  // Retrieve the video ID (vid) from localStorage
  const vid = localStorage.getItem('vid');

  // Reference to the last message element for auto-scrolling
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (inputQuestion) => {
    if (inputQuestion.trim() !== '') {
      // Add a new user message
      setMessages((prevMessages) => [...prevMessages, { text: inputQuestion, sender: 'user' }]);
      setQuestion(''); // Clear the input field
      setLoading(true); // Set loading state to true

      try {
        // Prepare form-data
        const formData = new FormData();
        formData.append('vid', vid);
        formData.append('user_input', inputQuestion);

        // Make the API call to generate the response from the bot
        const generated_res = await axios.post('https://relaxing-safely-leech.ngrok-free.app/generate_response', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Assuming the API responds with a 'response' field containing the bot's answer
        const botResponse = generated_res.data.generated_response;

        // Add the bot's response after a delay (simulate typing)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to get response from the bot. Please try again.', sender: 'bot' },
        ]);
      } finally {
        setLoading(false); // Stop loading when done
      }
    }
  };

  // Function to handle GET API call
 const handleGetApiCall = async () => {
  try {
    const response = await axios.get(`https://relaxing-safely-leech.ngrok-free.app/get_video_notes_p/${vid}`);
    setApiResponse(response.data); // Update state with the GET API response
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data. Please try again.');
  }
};




  // Initialize with a default message on component mount
  useEffect(() => {
    if (!defaultMessageSentRef.current) {
      const defaultQuestion = 'Video Summary';
      handleSubmit(defaultQuestion);
      defaultMessageSentRef.current = true; // Mark the default message as sent
    }
  }, []); // Empty dependency array to run only on mount

  // Scroll to the bottom of the chat window whenever messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container mt-5">
      <h1 id="headQue">Ask a Question</h1>

      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <span className="icon">
                {msg.sender === 'user' ? <FaUserAlt /> : <FaRobot />}
              </span>
              <span className="text">{msg.text}</span>
            </div>
          ))}
          {loading && <div className="message bot">VidtextBot is typing...</div>} {/* Show typing indicator */}
          <div ref={messagesEndRef} /> {/* Scroll reference */}
        </div>
        <div className="bot-image">
          <img src={chatbot} alt="Chatbot" className="img-fluid" />
        </div>
      </div>

      <div className="input-container">
        <textarea
          className="question-input"
          placeholder="Type your question here..."
          value={question}
          onChange={handleInputChange}
          rows="3"
        />
        <button className="send-button" onClick={() => handleSubmit(question)} disabled={loading}>
          <MdSend />
        </button>
      </div>

      {/* Add GET API call button */}
      <div className="get-api-button-container">
        <button className="get-api-button" onClick={handleGetApiCall}>
          Generate notes for the video
        </button>
      </div>
    </div>
  );
};

export default AskQ;
