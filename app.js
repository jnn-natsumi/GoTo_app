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
    'SELECT * FROM names',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {names:results});
    }
  );
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO names (name) VALUES (?)',
    [req.body.nameName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query('DELETE FROM names WHERE id = ?',
  [req.params.id],
  (error, results) => {
    res.redirect('/');
  })
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'select *  from names where id= ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {name:  results[0]});
    })
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'update names set name = ? where id =?',
    [req.body.nameName,req.params.id],
    (error, results) => {
      res.redirect('/');
    })
});

const port = process.env.PORT || 3000;
    app.listen(port, () => { 
        console.log("ポート" + port + "番で起動しました！")
    })