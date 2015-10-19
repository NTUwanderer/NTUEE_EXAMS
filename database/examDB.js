var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exams');

var exam = new Schema({
  name:   String,
  quiz:   [{
    name:   String,
    items: [String]
  }],
  exam:   [{
    name:   String,
    items: [String]
  }]
});

/*
普通物理學    physics
    cprogram
    biology
    chemistry
    cscience
    linear
    electron
    circuit
    diff
    logic
    electrom
    signal
    probability
    complex
    discrete
*/

exam.post('save', function(user){
  console.log("exam : ", exam, " has been saved. ");
})

//mongoose model
var database = mongoose.model('ALL_EXAMS', exam);

//database.remove({},function(err){console.log("remove");});;
/*var Test = new database();
  Test.id = "005";
  Test.name = "test5";
  Test.exp  = 50000;
  Test.save(function(Err){
  console.log(Err);
  });
*/


module.exports = {
  runSocket : function(io){
    database.count({}, function(err, number){
      //console.log(number);
      totalUsers = number;
    });
    //console.log(totalUsers);
    io.on('connection', function(socket){
      console.log("Socket is connected.");
      socket.on('disconnect',function(){
        console.log("Socket id : ", socket.id, " is disconnected.");
      });
    });
    socket.on('got', function(data){
      database.findOne({id : data.id}, function(err, user){
        user.got = data.got;//).parseInt();
        user.save();
      }) 
    });

    socket.on('query', function(data, callback){
      database.find({}, 'name id rank exp', {skip: (data.page - 1) * 10, limit: 10, sort: {exp: -1}}, function(err, results){
        callback(JSON.stringify(results), Math.ceil(totalUsers / 10));
      })
    });
    });
  }
};

// vim: set ts=2 sw=2 sts=2 tw=0 et :
