import React, { useState } from 'react';
import axios from 'axios'

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    symptoms: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/appointments', formData);
      if (res.data.success) {
        alert('Appointment booked successfully!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          doctor: '',
          symptoms: '',
        });
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Select Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Doctor --</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Patel">Dr. Patel</option>
            <option value="Dr. Khan">Dr. Khan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Symptoms / Concerns</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default Form;
