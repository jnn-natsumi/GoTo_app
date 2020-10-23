const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nannde',
  database: 'list_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM list_app',
    (error, results) => {
      res.render('index.ejs', {list_app:results});
    }
  );
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO list_app (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query('DELETE FROM list_app WHERE id = ?',
  [req.params.id],
  (error, results) => {
    res.redirect('/');
  })
});

app.get('/edit/:id', (req, res) => {
  res.render('edit.ejs');
})


app.listen(3000);