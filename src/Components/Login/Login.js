import React, { useState } from "react";
import './Login.css';

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
      });
    
      const [errors, setErrors] = useState({});
    
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
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("Form submitted successfully:", formValues);
          // Add logic to send form data to the backend
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
                <form onSubmit={handleSubmit}>
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