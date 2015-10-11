function add(){
			console.log("Hello World...!");
		}
	
function term(){
	var temp = document.getElementById("term");
	if(temp.innerHTML == "期中")	temp.innerHTML = "期末";
	else if(temp.innerHTML== "期末")	temp.innerHTML = "期中";
}
function semester(){
	var temp = document.getElementById("semester");
	if(temp.innerHTML == "上學期")	temp.innerHTML = "下學期";
	else if(temp.innerHTML== "下學期")	temp.innerHTML = "上學期";
}
