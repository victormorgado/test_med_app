import React, { useState, useEffect } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = ({ setIsLoggedIn }) => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
      });
    
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();

      // Check if user is already authenticated, then redirect to home page
        useEffect(() => {
            if (sessionStorage.getItem("auth-token")) {
            navigate("/");
            }
        }, []);
    
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
      };
    
      // Validate form
      const validateForm = () => {
        let validationErrors = {};

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formValues.email)) {
          validationErrors.email = "Enter a valid email address.";
        }
    
        // Password validation
        if (!formValues.password || formValues.password.length < 6) {
          validationErrors.password = "Password must be at least 6 characters long.";
        }
    
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // Returns true if no errors
      };

      // Function to handle submission
    const login = async (e) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formValues.email,
            password: formValues.password,
        }),
        });
        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
            console.log('Log in!');
            setIsLoggedIn(true); // Set login state
            // If authentication token is received, store it in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', formValues.email);
            // Redirect to home page and reload the window
            navigate('/');
            window.location.reload();
        } else {
        // Handle errors if authentication fails
        if (json.errors) {
            for (const error of json.errors) {
            alert(error.msg);
            }
        } else {
            alert(json.error);
        }
        }
    };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("Form submitted successfully:", formValues);
          // Add logic to send form data to the backend
          login(e);
        }
      };

    return(
        <>
        <div className="container">
            <div className="login-grid">
            <div className="login-text">
                <h2>Login</h2>
            </div>
            <div className="login-text">
                Are you a new member? <span><a href="../Sign_Up/Sign_Up.html" style={{color: '#2190FF'}}> Sign Up Here</a></span>
            </div>
            <br />
            <div className="login-form">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={formValues.email} onChange={handleChange} placeholder="Enter your email" aria-describedby="helpId" />
                        {errors.email && <small style={{ color: 'red', fontsize: '8px' }}>{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control"  value={formValues.password} onChange={handleChange} placeholder="Enter your password" aria-describedby="helpId"/>
                        {errors.password && <small style={{ color: 'red', fontsize: '8px' }}>{errors.password}</small>}
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
                    </div>
                    <div className="btn-group">
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={() => setFormValues({ email: "", password: "" })}>Reset</button>
                    </div>
                    <br />
                    <div className="login-text">
                        Forgot Password?
                    </div>
                </form>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login;