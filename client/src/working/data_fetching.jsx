import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../working/data_fetching.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [editData, setEditData] = useState(null); // Object with current editing data

  const navigate = useNavigate();

  const fetchAppointments = () => {
    axios.get('http://localhost:5000/api/appointments')
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch appointments:', err);
        setError('Failed to load appointments. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`http://localhost:5000/api/appointments/${id}`)
        .then(() => {
          fetchAppointments();
        })
        .catch(err => {
          alert('Failed to delete. Try again.');
          console.error(err);
        });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { id, full_name, email, phone, date, time, doctor, symptoms } = editData;

    axios.put(`http://localhost:5000/api/appointments/${id}`, {
      fullName: full_name,
      email,
      phone,
      date,
      time,
      doctor,
      symptoms
    })
      .then(() => {
        setEditData(null); // Close modal
        fetchAppointments(); // Refresh list
      })
      .catch((err) => {
        alert('Update failed.');
        console.error(err);
      });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🩺 Appointment Dashboard</h1>
        <p className="subtitle">Manage your upcoming medical appointments</p>
      </header>

      {loading && <div className="loading">Loading appointments...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && appointments.length === 0 && (
        <div className="no-data">No appointments found.</div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="card-grid">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className={`card ${hoveredCard === apt.id ? 'card-hover' : ''}`}
              onMouseEnter={() => setHoveredCard(apt.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h2 className="card-title">
                👨‍⚕️ Appointment with <span className="doctor-name">{apt.doctor}</span>
              </h2>

              <div className="info-row"><span className="label">👤 Name:</span> <span className="value">{apt.full_name}</span></div>
              <div className="info-row"><span className="label">📧 Email:</span> <span className="value">{apt.email}</span></div>
              <div className="info-row"><span className="label">📞 Phone:</span> <span className="value">{apt.phone}</span></div>

              <div className="date-time-container">
                <div className="date">📅 {apt.date}</div>
                <div className="date">⏰ {apt.time}</div>
              </div>

              <div className="symptoms">
                <strong>📝 Symptoms:</strong><br />
                {apt.symptoms}
              </div>

              <div className="action-buttons">
                <button onClick={() => navigate(`/edit/${apt.id}`)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(apt.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      
     
    </div>
  );
}

export default App;
