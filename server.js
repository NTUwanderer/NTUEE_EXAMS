var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000, function(){
    console.log('Listening on localhost: 8000');
})

app.use(express.static(__dirname + "/"));


