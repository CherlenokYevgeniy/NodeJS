const mysql = require('mysql');
const express = require('express');
var app =express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
    multipleStatement: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection successful');
    else
        console.log('DB connection failed \n Error:' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () =>console.log('Express server is running at port 3000'));

app.get('/people', (req, res) =>{
    mysqlConnection.query('SELECT * FROM crud', (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

app.get('/people/:id', (req, res) =>{
    mysqlConnection.query('SELECT * FROM crud WHERE ID=?',[req.params.id],(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

app.delete('/people/:id', (req, res) =>{
    mysqlConnection.query('DELETE FROM crud WHERE ID=?',[req.params.id],(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

app.put('/people', (req, res) =>{
    let men = req.body;
    var sql = 'SET @ID = ?;SET @Name = ?; CALL CrudAddOrEdit(@ID, @Name);';
    mysqlConnection.query(sql ,[men.id, men.Name, req.params.id],(err, rows, fields)=>{
        if(!err)
            rows.forEach(element =>{
                if(element.constructor == Array)
                    res.send('Inserted men id : ' +element[0].id);
            })
        else
            console.log(err);
    })
})

app.put('/people', (req, res) =>{
    let men = req.body;
    var sql = "SET @ID = ?;SET @Name = ?; CALL CrudAddOrEdit(@ID, @Name);";
    mysqlConnection.query(sql,[men.id, men.Name, req.params.id],(err, rows, fields)=>{
        if(!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
})



