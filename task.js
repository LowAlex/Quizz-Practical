const express = require('express');
const app = express();
const port = 4000;

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'alexan',  
  database: 'quizz'  
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.stack);
    return;
  }
  console.log('Connecté à MySQL avec l\'ID', connection.threadId);
});

app.get('/db', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS quizz';
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send('Failed to create database.');
    }
    res.send('Database created!');
  });
});

app.get('/users', (req, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT, 
    first_name VARCHAR(40), 
    last_name VARCHAR(40), 
    email VARCHAR(50), 
    PRIMARY KEY(user_id)
  )`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).send('Failed to create table.');
    }
    res.send('Users table created!');
  });
});

app.get('/adduser', (req, res) => {
  const sql = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';
  const firstName = 'Robin';
  const lastName = 'Gari';
  const email = 'robingari@yahoo.ca';

  connection.query(sql, [firstName, lastName, email], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Failed to add user.');
    }
    res.send('User added!');
  });
});

app.get('/show', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, records) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Failed to fetch users.');
    }
    res.json(records); // Use JSON to return structured data
  });
});

app.get('/delete/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE user_id = ?';
  const userId = req.params.id;

  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).send('Failed to delete the record.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('No user found with the given ID.');
    }

    res.send('User successfully deleted.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
