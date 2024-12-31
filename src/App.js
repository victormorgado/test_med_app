import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <>
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
