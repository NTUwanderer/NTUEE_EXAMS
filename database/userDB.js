var mongoose = require('mongoose');
var child_ps = require('child_process');
var fs = require('fs');
var JSzip = require('jszip');

mongoose.connect('mongodb://localhost:27017/ntuee-exam');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection succeeded.');
});

var Schema = mongoose.Schema;

var user = new Schema({
  id      : {type: String, default: "b00000000"}
 ,name    : String
 ,content : {type: Array, default: create()}
});
user.post('save', function(user){
  console.log("user : " , user ," has been saved. ");
});

var exam = new Schema({
  name:   String,
  quiz:   [{
    name:   String,
    file:   [String]
  }],
  exam:   [{
    name:   String,
    file:   [String]
  }]
});
exam.post('save', function(user){
  //  console.log("exam : ", exam, " has been saved. ");
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


//mongoose model
var Users = mongoose.model('users', user);
var Exams = mongoose.model('exams', exam);

//'model'.remove({},function(err){console.log("remove");});;
/*test = new Users;
test.save();*/

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
        console.log("Get initial.");
        var init;
        Users.findOne({id : data.id}, function(err, obj){
          if (err) {console.log(err);}
          else if (obj != null) {
            init = obj.content;
            console.log(init);
            Exams.find({}, 'name quiz exam', function(err, exams){
              if(err){console.log(err);}
              exams.forEach(function(i){
                //console.log("find: ", i);
                /*console.log("\n");
                console.log("name: ", i.name);
                console.log("quiz: ", i.quiz);
                console.log("exam: ", i.exam);*/
              });
              callback(init, exams);
            });
          }
        });
      });
      socket.on('submit', function(obj, callback){
        var zip = new JSzip();
        console.log("get submit obj: ", obj.data);
        var reqFiles = " ";
        var fileDIR;
        var path;
        for(var i = 0; i < obj.data.length; i++){
          fileDIR = obj.data[i].split("@");
          path = zip.folder(fileDIR[0]);
          path.file(fileDIR[0] + '_' + fileDIR[1] + '.pdf', fs.readFileSync(examDIR + fileDIR[0] + '/' + fileDIR[0] + '_' + fileDIR[1] + '.pdf'));
        }
        var content = zip.generate({type:"base64"});
        //console.log(content);
        var a = 1;
        callback(a, content);
        /*fs.writeFile(zipDIR + obj.id + '.zip', content, function(err){if(err){throw err;}
                //var zipFile = zipDIR + obj.id + '.zip';
                //var a = 1;
                //callback(a, zipFile);
        });*/
      });
    });
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
