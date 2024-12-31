import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Check session storage on load to determine if the user is logged in
    useEffect(() => {
        const authToken = sessionStorage.getItem("auth-token");
        if (authToken) {
        setIsLoggedIn(true);
        }
    }, []);

  return (
    <div className="App">
      <>
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/instant-consultation" element={<InstantConsultation />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
