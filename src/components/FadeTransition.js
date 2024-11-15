// FadeTransition.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './FadeTransition.css'; // Import the CSS for the animations

const FadeTransition = ({ children, location }) => {
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key} // Key should change on route change
                classNames="fade"
                timeout={300} // Duration of the transition
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default FadeTransition;
