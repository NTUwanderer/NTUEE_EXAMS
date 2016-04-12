var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var userDB = require("./database/userDB.js");

server.listen(8000, function(){
    console.log('Listening on localhost: 8000');
})

app.use(express.static(__dirname + "/"));

app.get('/', function(req, res){
	res.render('index.html');
});

userDB.runSocket(io);

var testing = require("./js/examLink.js");

console.log(testing);
