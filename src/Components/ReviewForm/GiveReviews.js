// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';

// Function component for giving reviews
function GiveReviews({ doctorId, onSubmit }) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: 0,
    name: '',
    review: '',
    rating: 0
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(formData);

    // Prepare the review data
    const reviewData = {
        doctorId: doctorId,
        name: formData.name,
        review: formData.review,
        rating: formData.rating,
    };

    // Pass the review data to the onSubmit function
    onSubmit(reviewData);

    setFormData({
      doctorId: doctorId,
      name: '',
      review: '',
      rating: 0
    });
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      {
        // Display form for giving feedback
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
          <br/>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <br/>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
            <br/><br/>
          </div>
          <div className='radios-div'>
            <label htmlFor="rating">Rating:</label>
            <label for="1star" className='radios-label'>
                <input type="radio" id="1star" name="rating" value={1} onChange={handleChange} className='radios-input'/>
            1</label>
            <label for="2star" className='radios-label'>
                <input type="radio" id="2star" name="rating" value={2} onChange={handleChange} className='radios-input'/>
            2</label>
            <label for="3star" className='radios-label'>
                <input type="radio" id="3star" name="rating" value={3} onChange={handleChange} className='radios-input'/>
            3</label>
            <label for="4star" className='radios-label'>
                <input type="radio" id="4star" name="rating" value={4} onChange={handleChange} className='radios-input'/>
            4</label>
            <label for="5star" className='radios-label'>
                <input type="radio" id="5star" name="rating" value={5} onChange={handleChange} className='radios-input'/>
            5</label>
            
          </div>
          {/* Submit button for form submission */}
          <br/>
          <button type="submit">Submit</button>
        </form>
      }
      {/* Display the submitted message if available */}
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
