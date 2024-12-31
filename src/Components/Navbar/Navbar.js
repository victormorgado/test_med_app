import React, { useEffect, useState } from "react"; // Importing the necessary modules from React library
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();
    //setIsLoggedIn(true);

    useEffect(() => {
        //sessionStorage.setItem("email", "victor@email.com");

        console.log(isLoggedIn);
        if (isLoggedIn) {
          // Retrieve email from sessionStorage and extract the name
          const email = sessionStorage.getItem("email");
          console.log(email);
          if (email) {
            const name = email.split('@')[0]; // Extract the portion before '@'
            setUserName(name);
          }
        } else {
          setUserName(null); // Clear the name on logout
        }
      }, [isLoggedIn]);

    const handleClick = () => {
        console.log('Navbar icon clicked!');
    };
    const handleLogout = () => {
        console.log('Log out!');
        setIsLoggedIn(false); // Log out the user
        sessionStorage.removeItem("auth-token"); // Clear from sessionStorage
        sessionStorage.removeItem("name"); // Clear from sessionStorage
        sessionStorage.removeItem("phone"); // Clear from sessionStorage
        sessionStorage.removeItem("email"); // Clear from sessionStorage
        navigate('/'); // Redirect to the homepage
    };
  return (
    <>
    <nav>
        <div className="nav__logo" style={{ textDecoration: 'none'}}>
          <a href="/" style={{ textDecoration: 'none', color: 'black'  }}>
            StayHealthy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              width="26"
              viewBox="0 0 1000 1000"
              style={{ fill: '#00C9B1' }}
            >
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <g>
                  <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                  <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                  <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                </g>
              </g>
            </svg>
          </a>
        </div>

        <div className="nav__icon" onClick={handleClick}>
          <i className="fa fa-times fa fa-bars"></i>
        </div>

        <ul className="nav__links active">
          <li className="link">
            <a href="/">Home</a>
          </li>
          <li className="link">
            <a href="/instant-consultation">Appointments</a>
          </li>
          {isLoggedIn ? (
            <>
            <li className="link">
                    <p style={{ margin: '0px' }}>
                        Welcome, {userName}
                    </p>
                </li>
            <li className="link">
                <a href="/login" onClick={handleLogout} style={{ margin: '0rem 1rem 0rem -0.5rem' }}>
                <button className="btn1">Logout</button>
                </a>
            </li>
            </>
            ) : (
            <>
                <li className="link">
                    <a href="/signup" style={{ margin: '0px' }}>
                    <button className="btn1">Sign Up</button>
                    </a>
                </li>
                <li className="link">
                    <a href="/login" style={{ margin: '0rem 1rem 0rem -0.5rem' }}>
                    <button className="btn1">Login</button>
                    </a>
                </li>
            </>
            )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
