const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const mongoDB = 'mongodb://localhost/studentdb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let StudentModel = require('./app/models/Student')

app.get('/', (req, res) => {
    StudentModel.find({}, (err, result) => {
        if (err) throw err;
        res.render('index', {data: result});
    })
})

app.post('/post', (req, res) => {
    let student = new StudentModel({
        name: req.body.name,
        surname: req.body.surname,
    })
    student.save()
        .then(doc => {
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
})

app.post('/put', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    StudentModel.findById(id, (err, student) => {
        if (err) throw err;
        student.id = id;
        student.name = name;
        student.surname = surname;
        student.save((error) => {
            if (error) throw error;
            console.log("Student updated!");
        })
    });
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    StudentModel
        .findOneAndRemove(
            {
                "_id": req.params.id
            }, {returnNewDocument: true})
        .then(doc => {
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
})

app.listen(8000);