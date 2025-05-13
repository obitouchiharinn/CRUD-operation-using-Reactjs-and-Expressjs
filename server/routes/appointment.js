const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE an appointment
router.post('/', (req, res) => {
  const { fullName, email, phone, date, time, doctor, symptoms } = req.body;

  const sql = `
    INSERT INTO appointments (full_name, email, phone, date, time, doctor, symptoms)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [fullName, email, phone, date, time, doctor, symptoms];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.status(201).json({ success: true, message: 'Appointment booked', id: result.insertId });
  });
});

// READ all appointments
router.get('/', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// UPDATE an appointment by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, date, time, doctor, symptoms } = req.body;

  const sql = `
    UPDATE appointments
    SET full_name = ?, email = ?, phone = ?, date = ?, time = ?, doctor = ?, symptoms = ?
    WHERE id = ?
  `;
  const values = [fullName, email, phone, date, time, doctor, symptoms, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.status(200).json({ success: true, message: 'Appointment updated' });
  });
});

// DELETE an appointment by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM appointments WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.status(200).json({ success: true, message: 'Appointment deleted' });
  });
});

module.exports = router;
