// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true); // State to manage notification visibility


  // useEffect hook to perform side effects in the component
  useEffect(() => {
    //generate generic data for testing
    // Doctor data
    const doctorDataFake = {
        name: "Dr. Jiao Yang",
        speciality: "Dentist"
    };
    
    // Appointment data
    const appointmentDataFake = {
        id: "1",
        name: "Jane Smith",
        date: "2025-01-10",
        selectedSlot: "10:00 AM"
    };
    // Store doctor data
    localStorage.setItem('doctorData', JSON.stringify(doctorDataFake));

    // Store appointment data using the doctor's name as the key
    localStorage.setItem(doctorDataFake.name, JSON.stringify(appointmentDataFake));

    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
        console.log(appointmentData);
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
    else{
        console.log("NO appointmentData");
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Function to handle appointment cancellation
  const handleCancelAppointment = () => {
    // Perform cancellation logic here (e.g., update localStorage, notify server)
    // ...

    // Hide the notification
    setShowNotification(false);
  };

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */ console.log("notification!!!")}
                <p><strong>Doctor:</strong> {doctorData?.name}</p>
                <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
                <p><strong>Name:</strong> {appointmentData?.name}</p>
                <p><strong>Date of Appointment:</strong> {appointmentData?.date}</p>
                <p><strong>Time:</strong> {appointmentData?.selectedSlot}</p>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;