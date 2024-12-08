const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Dhakshayan@07', // Replace with your MySQL password
  database: 'employee_management'
});

module.exports = pool.promise();
