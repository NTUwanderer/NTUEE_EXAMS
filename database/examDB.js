var mongoose = require('mongoose');

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
      /*exams.forEach(function(i){
        console.log("find: ", i);
        console.log("name: ", i.name);
        console.log("quiz: ", i.quiz);
        console.log("exam: ", i.exam);
      });*/

      callback && callback(exams);
    });
  },
  runSocket : function(io){
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
