import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarH from '../NavbarH'; // Adjust path as necessary
import Home from '../Home'; // Adjust path as necessary
import About from '../About'; // Adjust path as necessary
import AskQ from '../AskQ'; // Adjust path as necessary
import Convervtt from '../Convervtt'; // Adjust path as necessary
import Loader from '../Loader';


function App() {
  return (
    <Router>
      <NavbarH />
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ask" element={<AskQ />} />
          <Route path="/convert" element={<Convervtt />} />
          <Route path="/loader" element={<Loader />} />

          
        </Routes>
  
    </Router>
  );
}

export default App;
