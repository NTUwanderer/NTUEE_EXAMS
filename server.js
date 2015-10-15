var express = require('express');
var app = express.createServer();
var io = require('socket.io')(app);

app.listen(8000, function(){
    console.log('Listening on localhost: 8000');
})

app.use(express.static(__dirname + "/"));


