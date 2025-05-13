import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../working/data_fetching.css';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/appointments`)
//       .then(res => {
//         const appointment = res.data.find(a => a.id.toString() === id);
//         setEditData(appointment);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Failed to load appointment.');
        
//       });
//   }, [id, navigate]);

useEffect(() => {
    axios.get(`http://localhost:5000/api/appointments`)
      .then(res => {
        const appointment = res.data.find(a => a.id.toString() === id);
        if (appointment) {
          const formattedDate = new Date(appointment.date).toISOString().split('T')[0]; // YYYY-MM-DD
          const formattedTime = appointment.time.slice(0, 5); // HH:MM (assumes it's already in correct format)
          
          setEditData({
            ...appointment,
            date: formattedDate,
            time: formattedTime
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to load appointment.');
        navigate('/');
      });
  }, [id, navigate]);
  

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, phone, date, time, doctor, symptoms } = editData;

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
        alert('Appointment updated successfully!');
        navigate('/Data');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update appointment.');
      });
  };

  if (loading || !editData) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2>Edit Appointment</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <input name="full_name" value={editData.full_name} onChange={handleEditChange} placeholder="Full Name" required />
        <input name="email" value={editData.email} onChange={handleEditChange} placeholder="Email" required />
        <input name="phone" value={editData.phone} onChange={handleEditChange} placeholder="Phone" required />
        <input name="date" value={editData.date} onChange={handleEditChange} type="date" required />
        <input name="time" value={editData.time} onChange={handleEditChange} type="time" required />
        <input name="doctor" value={editData.doctor} onChange={handleEditChange} placeholder="Doctor" required />
        <textarea name="symptoms" value={editData.symptoms} onChange={handleEditChange} placeholder="Symptoms" required />

        <div className="modal-actions">
          <button type="submit">✅ Update</button>
          <button type="button" onClick={() => navigate('/Data')}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditAppointment;
