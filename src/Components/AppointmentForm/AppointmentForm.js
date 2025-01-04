import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  /*
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };*/
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, date, selectedSlot, doctorName, doctorSpeciality });
      setName('');
      setPhoneNumber('');
      setDate('');
      setSelectedSlot(null);
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Date of Appointment:</label>
          <input
            type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Date of Appointment:</label>
          <select name="cars" id="time" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
                <option value="10 AM">10 AM</option>
                <option value="12 PM">12 PM</option>
                <option value="6 PM">6 PM</option>
            </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm;
