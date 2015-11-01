var examDB = require("./database/examDB.js");
var fs = require('fs');

if((process.argv).length > 2){
  cmd = process.argv[2];
  if(cmd == '--help'){
    console.log(
      "  --allexam        to see all exams in DB. \n" +
      "  --build          to build examsLink to js/examLink.js."
    );
  }
  else if(cmd == '--allexam'){
    examDB.getExams(function(exams){
      console.log("I get the exams from DB :", exams);
    });
  }
  else if(cmd == '--build'){
    examDB.getExams(function(exams){
      fs.open('js/examLink.js', 'w', function(err){
        if(err) throw err;
        console.log("js/examLink.js is open.");

        var string = "var examLink = JSON.parse(\'" + JSON.stringify(exams) + "\');";
        fs.writeFile('js/examLink.js', string, 'utf8', function(err){
          if(err) throw err;
          console.log('It\'s saved!');
        });
      });
    });
  }
	else if(cmd == '--construct'){
		examDB.construct();
	}
}

