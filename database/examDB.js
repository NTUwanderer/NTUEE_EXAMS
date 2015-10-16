var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exams');

var exams = new Schema({
   course  : String
  ,type    : String
  ,count   : Number
  ,year    : Number
  ,sem     : Number
});

/*
    physics
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

User.post('save', function(user){
  console.log("user : " ,user ," has been saved. ");
})


//mongoose model
var database = mongoose.model('EXAM_account', User);

//database.remove({},function(err){console.log("remove");});;
/*var Test = new database();
  Test.id = "005";
  Test.name = "test5";
  Test.exp  = 50000;
  Test.save(function(Err){
  console.log(Err);
  });*/


module.exports = {
  findOne : function(obj, func){
    database.findOne({id : obj}, function(err, user){
      func(err, user);
    });  
  },
  findOrCreate : function(obj, func){
    database.findOne({id : obj.id}, function(err, user){
      //console.log(obj.id);
      //console.log("user is ", user.name);
      if(user === null /*|| user.name != obj.displayName*/){
        totalUsers += 1;
        var newUser = new database();
        newUser.id = obj.id;
        newUser.name = obj.displayName;
        console.log("newUser: ", newUser);
        newUser.save(function(Err, newUser){
          console.log(Err);
          if(func)func(err, newUser);
        });
      }
      else{
        //console.log(user);
        //console.log(typeof(obj.displayName));
        func(err, user);
      }
    });
  },
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
      socket.on('score', function(data, callback){
        database.findOne({id : data.id}, function(err, user){
          user.exp = user.exp + data.bonus;//).parseInt();
          if(user.exp < 50)user.exp = 50;
          while(user.rank < 99 && user.exp >= rankThreshold[user.rank + 1])user.rank = user.rank + 1;
          while(user.rank > 1 && user.exp < rankThreshold[user.rank])user.rank = user.rank - 1;
          user.save();
          callback(user.rank, user.exp);
          updataCounter += 1;
          if(updataCounter * 10 > totalUsers){
            socket.emit('update',{});
            updataCounter = 0;
          }
        }) 
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

