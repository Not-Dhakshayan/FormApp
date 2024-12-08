const express = require('express');
const db = require('../config/db'); // Database connection
const router = express.Router();
// get req
router.get('/', async (req, res) => {
  try {
    // Fetch all employees from the database
    const [employees] = await db.query('SELECT * FROM employees');
    res.status(200).json(employees); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});
// POST route for adding an employee
router.post('/', async (req, res) => {
  const { name, age, email, phone, department, date_of_joining, role } = req.body;

  // Validate input
  if (!name || !age || !email || !phone || !department || !date_of_joining || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (parseInt(age, 10) <= 18) {
    return res.status(400).json({ message: 'Age must be above 18.' });
  }

  try {
    // Check if Phone or Email already exists
    const [existingEmployee] = await db.query(
      'SELECT * FROM employees WHERE phone = ? OR email = ?',
      [phone, email]
    );

    if (existingEmployee.length > 0) {
      return res.status(400).json({ message: 'Already exists.' });
    }

    // Insert employee into database
    await db.query(
      'INSERT INTO employees (name, age, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, age, email, phone, department, date_of_joining, role]
    );

    res.status(201).json({ message: 'Employee added successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
