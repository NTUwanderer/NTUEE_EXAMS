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

var examDIR = "pdfs/";
var zipDIR = "zipDir/";

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
          reqFiles += fileDIR[0] + '/' + fileDIR[0] + '_' + fileDIR[1] + '.pdf' + ' ';
        }
        var zipFile = '../' + zipDIR + obj.id + '.zip';
        console.log('rm -f ' + zipDIR + obj.id + '.zip');
        child_ps.exec('rm -f ' + zipDIR + obj.id + '.zip',
          function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
          }
        );
        child_ps.exec(
            'cd ' + examDIR +' && zip ' + zipFile + reqFiles,
            function (error, stdout, stderr) {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null) {
                console.log('exec error: ' + error);
              }
              //
              child_ps.exec('cd ..', function(error){
                var a = 1;
                callback(a, zipFile);
              });
            });
      });
    });
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
