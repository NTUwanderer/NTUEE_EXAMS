var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users');

var Schema = mongoose.Schema;
var users = new Schema({
   id      : String
  ,name    : String
  ,content : 
);

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
        }) 
      });

    socket.on('got', function(data){
      database.findOne({id : data.id}, function(err, user){
      }) 
    });

    socket.on('query', function(data, callback){
      database.find({}, 'name id rank exp', {skip: (data.page - 1) * 10, limit: 10, sort: {exp: -1}}, function(err, results){
      })
    });
    });
  }
};

