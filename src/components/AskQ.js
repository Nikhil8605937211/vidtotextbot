import React, { useState, useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md'; // Import the send icon only
import axios from 'axios'; // Import axios for API requests
import './AskQ.css'; // Import CSS for styling

const AskQ = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // To manage loading state while waiting for the bot response

  // Retrieve the video ID (vid) from localStorage
  const vid = localStorage.getItem('vid');

  // Reference to the last message element for auto-scrolling
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (question.trim() !== '') {
      // Add a new user message
      setMessages([...messages, { text: question, sender: 'user' }]);
      setQuestion(''); // Clear the input field
      setLoading(true); // Set loading state to true

      try {
        // Prepare form-data
        const formData = new FormData();
        formData.append('vid', vid);
        formData.append('user_input', question);

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
              {msg.text}
            </div>
          ))}
          {loading && <div className="message bot">VidtextBot is typing...</div>} {/* Show typing indicator */}
          <div ref={messagesEndRef} /> {/* Scroll reference */}
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
        <button className="send-button" onClick={handleSubmit} disabled={loading}>
          <MdSend />
        </button>
      </div>
    </div>
  );
};

export default AskQ;
