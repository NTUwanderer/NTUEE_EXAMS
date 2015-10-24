var mongoose = require('mongoose');
var child_ps = require('child_process');

mongoose.connect('mongodb://localhost:27017/users');

var Schema = mongoose.Schema;
var users = new Schema({
   id      : {type: String, default: "b00000000"}
  ,name    : String
  ,content : {type: Array, default: create()}
});

function create(){
  var falses = new Array(25);
  for(var i = 0; i < 25; i++){
    falses[i] = false;
  }
  //
  falses[3] = true;
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
  //Test.id = "005";
  //Test.name = "test5";
  Test.save(function(Err){
    console.log(Err);
  });
*/

var examDIR = "examDir/";
var rarDIR = "rarDir/";

module.exports = {
  runSocket : function(io){
    io.on('connection', function(socket){
      console.log("Socket is connected.");
      socket.on('disconnect',function(){
        console.log("Socket id : ", socket.id, " is disconnected.");
      });
      socket.on('initial', function(data, callback){
        database.findOne({id : data.id}, function(err, user){
          callback(user.content);
        });
      });
      socket.on('submit', function(obj, callback){
        console.log("get submit obj: ", obj.data);
        var reqFiles = " ";
        var fileDIR;
        for(var i = 0; i < obj.data.length; i++){
          fileDIR = obj.data[i].split("@");
          reqFiles += examDIR + fileDIR[0] + '/' + fileDIR[1] + '.pdf' + ' ';
        }
        var rarFile = rarDIR + obj.id + '.rar';
        var rm = child_ps.exec('rm -f ' + rarFile);
        var rar = child_ps.exec(
          'rar a ' + rarFile + reqFiles,
          function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
              console.log('exec error: ' + error);
            }
            //
            var a = 1;
            callback(a, rarFile);
          }
        );
      });
    });
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
