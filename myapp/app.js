var indexPage = "index.html";

var express = require('express');


var loginModule = require("./login.js");
var database = require("./database.js");
var jsonParser = require('body-parser').json();
var DB = require('./dbsetup.js');
var recycleSystem = require('./recycle.js');


DB.init(function(){database.reset();});

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

loginModule.login(app);

recycleSystem.trigger();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + 'public/index.html');
});

var socketDict = {};

io.on('connection', function(socket){

	socket.on('new car', function(registration){
		console.log("connected");
		socketDict[registration.socket]=registration.ID;
		socket.broadcast.emit('new car');
	});

	socket.on('update', function(player){
		console.log("sending update message to everyone else");
		socket.broadcast.emit('update', player);
	});

	socket.on('disconnect', function(){
		io.emit('disconnect', socketDict[socket.toString()]);
	});
});

// app.get('/la', function (req, res) {
//   res.redirect(indexPage);
// });

app.get('/google',function(req,res){
	res.redirect("http://google.com");
});

// app.post('/updateSelf',jsonParser,database.updatePos,function(req,res){
// 	res.json({});
// });

// app.post('/fetchOthers',jsonParser,database.fetchOthers);


http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



