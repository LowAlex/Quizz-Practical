
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
  console.log("Access DB Route page");
  let sql = 'CREATE DATABASE if not exists quizz';
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
    console.log(result);
    res.send('A new database was created!');
  });
});


app.get('/users', (req, res) => {
  const sql = 'CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT, first_name VARCHAR(40), last_name VARCHAR(40), email VARCHAR(50), PRIMARY KEY(user_id))';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Users table is created!');
  });
});


app.get('/adduser', (req, res) => {
  let firstName = 'Robin';
  let lastName = 'Gari';
  let email = 'robingari@yahoo.ca';
  const sql = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';
  connection.query(sql, [firstName, lastName, email], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('One user was inserted');
  });
});


app.get('/selectall', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, records) => {
    if (err) {
      throw err;
    }
    console.log(records);
    res.send(records);
  });
});

app.listen(port,()=>{
  console.log("Server is running on port");
});

