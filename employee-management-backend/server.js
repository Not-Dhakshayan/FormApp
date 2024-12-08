const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employees'); // Import routes

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/employees', employeeRoutes); // Handle /api/employees routes

// Default route to check server is running
app.get('/', (req, res) => {
  res.send('Employee Management Backend is running!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
