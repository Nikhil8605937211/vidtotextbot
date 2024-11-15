// StickyRobotImage.js
import React from 'react';
import robotImage from '../assests/robot.png'; // Adjust the import path as necessary
import './StickyRobotImage.css'; // Import CSS for styling

const StickyRobotImage = () => {
    return (
        <div className="sticky-robot-container">
            <img src={robotImage} alt="Robot" className="robot-image" />
        </div>
    );
};

export default StickyRobotImage;
