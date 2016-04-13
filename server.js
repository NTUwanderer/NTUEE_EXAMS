var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var userDB = require("./database/userDB.js");
var path = require('path');

server.listen(8000, function(){
    console.log('Listening on localhost: 8000');
})

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('static'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

userDB.runSocket(io);

var testing = require("./static/js/examLink.js");

console.log(testing);
