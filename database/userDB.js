var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users');

var Schema = mongoose.Schema;
var users = new Schema({
   id      : String
  ,name    : String
  ,content : {type: Array, default: create()}
);

function create(){
  var falses = new Array(25);
  for(var i = 0; i < 25; i++){
    falses[i] = false;
  }
  return falses;
}

users.post('save', function(user){
  console.log("user : " ,user ," has been saved. ");
})

//mongoose model
var database = mongoose.model('userDB', users);

//database.remove({},function(err){console.log("remove");});;
/*
  var Test = new database();
  Test.id = "005";
  Test.name = "test5";
  Test.exp  = 50000;
  Test.save(function(Err){
  console.log(Err);
  });
*/


module.exports = {
  runSocket : function(io){
    io.on('connection', function(socket){
      console.log("Socket is connected.");
      socket.on('disconnect',function(){
        console.log("Socket id : ", socket.id, " is disconnected.");
      });
      socket.on('score', function(data, callback){
        database.findOne({id : data.id}, function(err, user){
        }) 
      });
    });
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
