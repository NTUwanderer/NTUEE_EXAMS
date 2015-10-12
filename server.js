var express = require('express');
var app = express();

app.listen(8000, function(){
    console.log('Listening on localhost: 8000');
})

app.use(express.static(__dirname + "/"));
