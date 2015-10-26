//上學期 false
//下學期 true
var sem = false; 

$(document).ready(function(){
    reset();
    $("#semester").click(function(){
        semester();
    });
});

function reset(){
	if(sem)	console.log("Semester resets. term : second semester.");
    else		console.log("Semester resets. term : first semester.");
    if(!sem){
        $(".first").show();
        $(".second").hide();
    }
    else{
        $(".second").show();
        $(".first").hide();
    }
}


function semester(){
  var temp = document.getElementById("semester");
  if(temp.innerHTML == "上學期") {
    temp.innerHTML = "下學期";
	remove(false);
    sem = true;
  }
  else if(temp.innerHTML== "下學期") {
    temp.innerHTML = "上學期";
    remove(true);
	sem = false;
  }
  reset();
}
