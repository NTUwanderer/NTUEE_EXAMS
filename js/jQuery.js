//上學期 期中 0
//       期末 1
//下學期 期中 2
//       期末 3
var ter_sem = 0;

$(document).ready(function(){
    reset();
    $("#semester").click(function(){
        semester();
    });
    $("#term").click(function(){
        term();
    });
});

function reset(){
    console.log("Semester resets. term : ", ter_sem);
    if(ter_sem <= 2){
        $(".first").show();
        $(".second").hide();
    }
    else{
        $(".second").show();
        $(".first").hide();
    }
}

function term(){
  var temp = document.getElementById("term");
  if(temp.innerHTML == "期中") {
    temp.innerHTML = "期末";
    ter_sem += 1;
  }
  else if(temp.innerHTML== "期末") {
    temp.innerHTML = "期中";
    ter_sem -=1;
  }
}
function semester(){
  var temp = document.getElementById("semester");
  if(temp.innerHTML == "上學期") {
    temp.innerHTML = "下學期";
    ter_sem += 2;
  }
  else if(temp.innerHTML== "下學期") {
    temp.innerHTML = "上學期";
    ter_sem -=2;
  }
  reset();
}
