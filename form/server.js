const express = require('express')
const app = express()
const cors=require('cors')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index')

})
app.post('/submit', function (req, res) {
	var text = req.body.mtext;
	console.log(text);
  res.render('resultpage',{
  	result:text
  });
   
  

})

app.listen(3000, function () {
  console.log('express web server at 3000 is running..')
})