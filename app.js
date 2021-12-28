const express = require('express')
const mysql = require('mysql');
const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'demo'
});

connection.connect(function(err){
  (err) ? console.log(err) : console.log(connection);
});
app.use(express.json());
  
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Welcome Bharath Khan');
});

app.get('/api/tasks', (req, res) => {
  var sql = "SELECT * FROM tasks";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({tasks: results});
  });
});
app.post('/api/tasks/create', (req, res) => {
  let dataObj = req.body.data
  let sql = `INSERT INTO tasks (task_name, description, due_date, status) VALUES 
  ('${dataObj.taskName}' , '${dataObj.description}', '${dataObj.dueDate}','${dataObj.status}')`;
    connection.query(sql,
      function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  res.send('1 record inserted');
  });
}); 
app.put('/api/tasks/update', (req, res) => {
  let dataObj = req.body.data
  let sql = `update tasks SET status='${dataObj.status}' , updated_date='${dataObj.updatedOn}' where id=${dataObj.id}`;
    connection.query(sql,
      function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  res.send('1 record updated');
  });
}); 
app.listen(5000, () => {
   console.log('App listening on port 5000')
})