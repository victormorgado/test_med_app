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
    /*
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
    };*/

    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const localAppointments = localStorage.getItem('appointments');
    const localDoctors = localStorage.getItem('doctorData');
    let storedUsername = '';
    let storedDoctorData = null;
    let storedAppointmentData = null;

    if (localAppointments !== null && localDoctors !== null) {
        const storedAppointments = JSON.parse(localAppointments);
        if(storedAppointments.length > 1)
            storedAppointmentData = findClosestAppointment(storedAppointments);
        else
            storedAppointmentData = storedAppointments[0];
        storedUsername = sessionStorage.getItem('email');

        const totalDoctors = JSON.parse(localDoctors);

        //search closest appointment's doctor data
        console.log(storedAppointments);
        console.log(storedAppointmentData);
        // Find the doctor object that matches the doctor's name in storedAppointmentData
        const matchingDoctor = totalDoctors.find(
            (doctor) => doctor.name === storedAppointmentData.doctorName
        );
        // If a matching doctor is found, assign it to storedDoctorData
        if (matchingDoctor) {
            storedDoctorData = matchingDoctor;
        } else {
            // Handle the case where no matching doctor is found, if necessary
            console.log('No matching doctor found.');
        }
      }

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
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
    else{
        console.log("NO appointmentData");
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

    // Function to find the appointment with the date closest to today and earliest time
    function findClosestAppointment(appointments) {
        const now = new Date();
        let closestAppointment = null;
        let smallestDifference = Infinity;
    
        appointments.forEach(appointment => {
        // Combine date and time into a single Date object
        const [month, day, year] = appointment.date.split('/');
        const appointmentDateTime = new Date(`${year}-${month}-${day} ${appointment.selectedSlot}`);
        const timeDifference = Math.abs(appointmentDateTime - now);
    
        // Check if this appointment is closer, or if it's a tie with an earlier time
        if (
            timeDifference < smallestDifference ||
            (timeDifference === smallestDifference && appointmentDateTime < new Date(`${closestAppointment.date} ${closestAppointment.selectedSlot}`))
        ) {
            smallestDifference = timeDifference;
            closestAppointment = appointment;
        }
        });
    
        return closestAppointment;
    }

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
      {doctorData && appointmentData && (
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