import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileForm/ProfileForm";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

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
          <Notification>
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />}/>
            <Route path="/profile" element={<ProfileForm />}/>
            <Route path="/reports" element={<ReportsLayout />}/>
          </Routes>
          </Notification>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
