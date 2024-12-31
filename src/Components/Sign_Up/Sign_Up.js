import React, { useState } from "react";
import './Sign_Up.css';

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "patient",
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
    
        // Name validation
        if (!formValues.name.trim()) {
          validationErrors.name = "Name is required.";
        }
    
        // Phone validation: only digits and exactly 10 characters
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formValues.phone)) {
          validationErrors.phone = "Phone number must be 10 digits.";
        }
    
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


    return (
        <>
        <div className="container" style={{margintop: '5'}}> 
            <div className="signup-grid"> 
                <div className="signup-text"> 
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{textalign: 'left'}}> 
                    Already a member? <span><a href="../Login/Login.html" style={{color: '#2190FF'}}> Login</a></span>
                </div>
                <div className="signup-form"> 
                    <form onSubmit={handleSubmit}>  
                        <div className="form-group"> 
                            <label for="role">Role</label>
                            <select id="role" name="role" required value={formValues.role} onChange={handleChange} className="form-control" aria-describedby="helpId">
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" required value={formValues.name} onChange={handleChange} className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                            {errors.name && <small style={{ color: 'red', fontsize: '8px' }}>{errors.name}</small>}
                        </div>
                        <div className="form-group">
                            <label for="phone">Phone</label> 
                            <input type="tel" name="phone" id="phone" required value={formValues.phone} onChange={handleChange} className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" /> 
                            {errors.phone && <small style={{ color: 'red', fontsize: '8px' }}>{errors.phone}</small>}
                        </div>
                        <div className="form-group"> 
                            <label for="email">Email</label> 
                            <input type="email" name="email" id="email" required value={formValues.email} onChange={handleChange} className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {errors.email && <small style={{ color: 'red', fontsize: '8px' }}>{errors.email}</small>}
                        </div>
                        <div className="form-group"> 
                            <label for="password">Password</label> 
                            <input name="password" id="password" required value={formValues.password} onChange={handleChange} className="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
                            {errors.password && <small style={{ color: 'red', fontsize: '8px' }}>{errors.password}</small>}
                        </div>
                        <div className="btn-group"> 
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> 
                        </div>
                        <div className="btn-group"> 
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={() => setFormValues({ name: "", phone: "", email: "", password: "", role: "patient" })}>Reset</button> 
                        </div>
                    </form> 
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp;

