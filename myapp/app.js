var indexPage = "index.html";

var express = require('express');


var loginModule = require("./login.js");
var database = require("./database.js");
var jsonParser = require('body-parser').json();
var DB = require('./dbsetup.js');
var recycleSystem = require('./recycle.js');


DB.init(function(){database.reset();});

var app = express();


loginModule.login(app);

recycleSystem.trigger();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect(indexPage);
});


app.get('/la', function (req, res) {
  res.redirect(indexPage);
});

app.get('/google',function(req,res){
	res.redirect("http://google.com");
});

app.post('/updateSelf',jsonParser,database.updatePos,function(req,res){
	res.json({});
});

app.post('/fetchOthers',jsonParser,database.fetchOthers);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



