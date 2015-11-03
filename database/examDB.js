var mongoose = require('mongoose');
var map = require("./examMap.js");
var exec = require('child_process').exec;

mongoose.connect('mongodb://localhost:27017/exams');

var Schema = mongoose.Schema;
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
  console.log("exam : ", exam, " has been saved. ");
})

//mongoose model
var database = mongoose.model('ALL_EXAMS', exam);

//database.remove({},function(err){console.log("remove");});;
/*var Test = new database();
  Test.name = "calculus1";
  Test.quiz.push({
  name: "第一次小考",
  file: ["103-1","104-1"]
  });
  Test.exam.push({
  name: "期中考",
  file: ["102-1","101-1"]
  });
  Test.save(function(Err){
  console.log(Err);
  });
  */


module.exports = {
  getExams : function(callback){
    database.find({}, 'name quiz exam', function(err, exams){
      exams.forEach(function(i){
        //console.log("find: ", i);
        console.log("\n");
        console.log("name: ", i.name);
        console.log("quiz: ", i.quiz);
        console.log("exam: ", i.exam);
      });

      callback && callback(exams);
    });
  },
  runSocket : function(io){
    io.on('connection', function(socket){
      console.log("Socket is connected.");
      socket.on('disconnect',function(){
        console.log("Socket id : ", socket.id, " is disconnected.");
      });
    });

  },
  construct : function(){
    //exec('cd pdfs', function (error, stdout, stderr) {});
    exec('ls pdfs', function (error, stdout, stderr) {
      var strings = stdout.split("\n");
      console.log(stdout);

      for (var s in strings) {
        console.log(strings[s]+": "+s);
        var ss = s;
        exec('ls pdfs/' + strings[ss], function (error, stdout, stderr){
          if(stdout.length != 0) {
            var pdf = stdout.split("\n"); //[signal_exam-1_87-2.pdf, ...]
            var subname = pdf[0].split("_")[0];

            var Test = new database();
            database.find({name: subname}, function(err, obj){
              if(obj.length == 0){
                Test.name = subname; //cprogram
                for(var i = 0; i < map[subname].quiz.length; ++i){
                  Test.quiz.push({
                    name: map[subname].quiz[i],
                    file: []
                  });
                }
                for(var i = 0; i < map[subname].exam.length; ++i){
                  Test.exam.push({
                    name: map[subname].exam[i],
                    file: []
                  });
                }

                for(var i in pdf){
                  var subpdf = pdf[i].split("_");
                  if(subpdf.length < 3) break;
                  var temp = subpdf[1].split("-");
                  var q_e = temp[0];
                  var index = parseInt(temp[1]) - 1;
                  var name = subpdf[2];
                  if(subpdf.length == 4)  name = subpdf[2] + "_" + subpdf[3];
                  name = name.substring(0, name.length - 4);

                  if(q_e == "quiz" && index < Test.quiz.length){
                    Test.quiz[index].file.push(name);
                  }
                  else if(q_e == "exam" && index < Test.exam.length){
                    Test.exam[index].file.push(name);
                  }
                  console.log(name);
                }


                Test.save(function(Err){
                  console.log(Test);
                  console.log(Err);
                });

              }
            });
          }
        });
      }
    });
  },
  clear : function(){
    database.remove({},function(err){console.log("Remove all exams.");});
  }
}
// vim: set ts=2 sw=2 sts=2 tw=0 et :
