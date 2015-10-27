var nameMap = new Map();

console.log("In main.js get examLink:", examLink);

var subjects = [
  // 中文,       English,    image location,        on screen, 上學期: false
  ["微積分甲上", "calculus1", "images/calculus1.jpg", false, false],
  ["普通物理學甲上", "physics1", "images/physics1.jpg", false, false],
  ["計算機程式", "cprograming", "images/cprograming.jpg", false, false],
  ["生物科學通論", "biology", "images/biology.jpg", false, false],
  ["普通化學丙", "chemistry", "images/chemistry.jpg", false, false],

  ["微積分甲下", "calculus2", "images/calculus2.jpg", false, true],
  ["普通物理學甲下", "physics2", "images/physics2.jpg", false, true],
  ["計算機概論", "cscience", "images/cscience.jpg", false, true],
  ["工程數學-線性代數", "linear", "images/linear.jpg", false, true],

  ["電子學一", "electron1", "images/electron1.jpg", false, false],
  ["電路學", "circuit", "images/circuit.jpg", false, false],
  ["工程數學-微分方程", "diff", "images/diff.jpg", false, false],
  ["交換電路與邏輯設計", "logic", "images/logic.jpg", false, false],

  ["電子學二", "electron2", "images/electron2.jpg", false, true],
  ["電磁學一", "electrom1", "images/electrom1.jpg", false, true],
  ["信號與系統", "signal", "images/signal.jpg", false, true],
  ["機率與統計", "probability", "images/probability.jpg", false, true],
  ["工程數學-複變", "complex", "images/complex.jpg", false, true],
  ["離散數學", "discrete", "images/discrete.jpg", false, true],

  ["電子學三", "electron3", "images/electron3.jpg", false, false],
  ["電磁學二", "electrom2", "images/electrom2.jpg", false, false]
  ];

  for(var i = 0; i < subjects.length; i++){
    nameMap.set(subjects[i][0], i);
  }

var socket = io.connect();
socket.emit('initial', {id: "b00000000"}, function(data){
  console.log("card init.", data);
  if(data !== 'undefined'){
    for(var i = 0; i < 25; i++){
      if(data[i] == true){
        add(document.getElementById(subjects[i][0]));
      }
    }
  }
});





function remove(bool){ // 上學期:false
	var main_container = document.getElementById("main_container");
	for(var i = 0; i < subjects.length; ++i){
		if(bool == subjects[i][4] && subjects[i][3]){
			var temp = document.getElementById("card: " + subjects[i][0]);
			if(temp != null)	main_container.removeChild(temp);
			subjects[i][3] = false;
		}
	}
}


function add(obj){
  console.log("adding");
  console.log(obj);
  var main_container = document.getElementById("main_container");
  var right_bar = document.getElementById("right_bar");
  var index = nameMap.get(obj.innerHTML);
  if(subjects[index][3]){
  	var temp = document.getElementById("card: " +　obj.innerHTML);
  	if(temp != null)
    	main_container.removeChild(temp);
    subjects[index][3] = false;
  }
  else{
    subjects[index][3] = true;

    var card = document.createElement("div");
    card.setAttribute("id", "card: " + obj.innerHTML);
    card.setAttribute("class", "card");
    card.setAttribute("style", "position: relative; display: inline-block; margin:2.5%; width:35%; height:30%");
      var card_image = document.createElement("div");
      card_image.setAttribute("class", "card-image waves-effect waves-block waves-light");
        var img = document.createElement("img");
        img.setAttribute("class", "size-Subject");
        img.setAttribute("src", subjects[index][2]);
      card_image.appendChild(img);
    card.appendChild(card_image);
      var card_content = document.createElement("div");
      card_content.setAttribute("class", "card-content");
        var card_title = document.createElement("span");
        card_title.setAttribute("class", "card-title activator grey-text text-darken-4");
        card_title.innerHTML = obj.innerHTML; // need to be dynamic
          var icon = document.createElement("i");
          icon.setAttribute("class", "material-icons right");
          icon.setAttribute("style", "position: relative; top: 10px;")
          icon.innerHTML = "more_vert";
        card_title.appendChild(icon);
	card_content.appendChild(card_title);
				
				var icon_out = document.createElement("i");
				icon_out.setAttribute("class", "material-icons right");
				icon_out.setAttribute("style", "position: relative; top:10px;");
				icon_out.innerHTML = "close";
				icon_out.onclick = function(){
					var temp = document.getElementById("card: " + subjects[index][0]);
					if(temp != null)	main_container.removeChild(temp);
					subjects[index][3] = false;
				}
			card_content.appendChild(icon_out);
			
		card.appendChild(card_content);
    
    var card_reveal = document.createElement("div");
    card_reveal.setAttribute("class", "card-reveal");
      var card_title2 = document.createElement("span");
      card_title2.setAttribute("class", "card-title grey-text text-darken-4");
      card_title2.innerHTML = obj.innerHTML; // need to be dynamic
        var icon2 = document.createElement("i");
        icon2.setAttribute("class", "material-icons right");
        icon2.innerHTML = "close";
      card_title2.appendChild(icon2);
    card_reveal.appendChild(card_title2);

        for(var i = 0; i < examLink.length; i++){
          if(examLink[i].name == subjects[index][1]){
            card.setAttribute("data-baseIndex", i);
    
            var block = document.createElement("div")
            block.style = "position: relative; display: flex; flex-direction: column;";
            block.style.width = "100%";
            block.style.height = "80%";
            block.style.padding = "0px";
            var alltok = [];
              var quiz = document.createElement("a");
              quiz.setAttribute("style", "display: inline-block; margin-left: 15px; font-size: 20px");
              quiz.setAttribute("onclick", "getQuiz(\"" + subjects[index][1] + "\")");
              quiz.innerHTML = "quiz";
            alltok.push(wrapper(quiz, "0" + subjects[index][1], true));
              var exam = document.createElement("a");
              exam.setAttribute("style", "display: inline-block; margin-left: 15px; font-size: 20px");
              exam.setAttribute("onclick", "getExam(\"" + subjects[index][1] + "\")");
              exam.innerHTML = "exam";
            alltok.push(wrapper(exam, "0" + subjects[index][1], true));
              var icon = document.createElement("i");
              icon.setAttribute("class", "material-icons ");
              icon.setAttribute("id", "icon" + subjects[index][1]);
              icon.style.position = "absolute";
              icon.style.top = "calc(100% - 24px)";
              icon.style.left = "calc(100% - 27px)";
              icon.style.display = "none";
              icon.innerHTML = "keyboard_return";
            alltok.push(icon);
              for(var j = 0; j < examLink[i].quiz.length; j++){
                var subquiz = document.createElement("a");
                subquiz.setAttribute("onclick", "getQfile(\""+ subjects[index][1] + "\")");
                subquiz.setAttribute("style", "margin-left: 15px; font-size: 18px");
                subquiz.innerHTML = examLink[i].quiz[j].name;
                alltok.push(wrapper(subquiz, "1q" + subjects[index][1], false));
                for(var k = 0; k < examLink[i].quiz[j].file.length; k++){
                  var link = document.createElement("a");
                  link.setAttribute("style", "padding: 3px");
                  link.innerHTML = examLink[i].quiz[j].file[k];
                  var string = examLink[i].name + "@quiz_" + j.toString();
                  string += "_" + examLink[i].quiz[j].file[k];
                  // string ex: biology_quiz_第一次小考_103-1
                  link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
               
                  alltok.push(wrapper(link, "2q" + subjects[index][1], false));
                }
              }
              for(var j = 0; j < examLink[i].exam.length; j++){
                var subexam = document.createElement("a");
                subexam.setAttribute("onclick", "getEfile(\"" + subjects[index][1] + "\")");
                subexam.setAttribute("style", " margin-left: 15px; font-size: 18px");
                subexam.innerHTML = examLink[i].exam[j].name;
                alltok.push(wrapper(subexam, "1e" + subjects[index][1], false));
                for(var k = 0; k < examLink[i].exam[j].file.length; k++){
                  var link = document.createElement("a");
                  link.innerHTML = examLink[i].exam[j].file[k];
                  link.setAttribute("style", "padding: 3px");
                  var string = examLink[i].name + "@exam_" + j.toString();
                  string += "_" + examLink[i].exam[j].file[k];
                  // string ex: biology_quiz_第一次小考_103-1
                  link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
    
                  alltok.push(wrapper(link, "2e" + subjects[index][1], false));
                }
              }
              for(var i = 0; i < alltok.length; i++){
                block.appendChild(alltok[i]);
              }                                
              /*
                 var block = document.createElement("ul"); // whole block
                 block.setAttribute("class", "collapsible");
                 block.setAttribute("data-collapsible", "accordion");
                 var quiz = document.createElement("li");
                 var quiz_header = document.createElement("div");
                 quiz_header.setAttribute("class", "collapsible-header");
                 quiz_header.innerHTML = "quiz" + index;
                 quiz.appendChild(quiz_header);
                 var quiz_body = document.createElement("div");
                 quiz_body.setAttribute("class", "collapsible-body");
    
                 for(var j = 0; j < examLink[i].quiz.length; j++){
                 var subblock = document.createElement("ul");
                 subblock.setAttribute("class", "collapsible");
                 subblock.setAttribute("data-collapsible", "accordion");
                 var subquiz = document.createElement("li");
                 var subquiz_header = document.createElement("div");
                 subquiz_header.setAttribute("class", "collapsible-header");
                 subquiz_header.innerHTML = examLink[i].quiz[j].name;
                 subquiz.appendChild(subquiz_header);
                 var subquiz_body = document.createElement("div");
                 subquiz_body.setAttribute("class", "collapsible-body");
                 for(var k = 0; k < examLink[i].quiz[j].file.length; k++){
                 var link = document.createElement("p");
                 link.innerHTML = examLink[i].quiz[j].file[k];
                 var string = examLink[i].name + "_quiz_" + examLink[i].quiz[j].name;
                 string += "_" + examLink[i].quiz[j].file[k];
              // string ex: biology_quiz_第一次小考_103-1
              link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
    
              subquiz_body.appendChild(link);
              }
              subquiz.appendChild(subquiz_body);
              subblock.appendChild(subquiz);
    
              quiz_body.appendChild(subblock);
              }
    
              quiz.appendChild(quiz_body);
              block.appendChild(quiz);
              var exam = document.createElement("li");
              var exam_header = document.createElement("div");
              exam_header.setAttribute("class", "collapsible-header");
              exam_header.innerHTML = "exam" + index;
              exam.appendChild(exam_header);
              var exam_body = document.createElement("div");
              exam_body.setAttribute("class", "collapsible-body");
              for(var j = 0; j < examLink[i].exam.length; j++){
    
              var subblock = document.createElement("ul");
              subblock.setAttribute("class", "collapsible");
              subblock.setAttribute("data-collapsible", "accordion");
              var subexam = document.createElement("li");
              var subexam_header = document.createElement("div");
              subexam_header.setAttribute("class", "collapsible-header");
              subexam_header.innerHTML = examLink[i].exam[j].name;
              subexam.appendChild(subexam_header);
              var subexam_body = document.createElement("div");
              subexam_body.setAttribute("class", "collapsible-body");
              for(var k = 0; k < examLink[i].exam[j].file.length; k++){
              var link = document.createElement("p");
              link.innerHTML = examLink[i].exam[j].file[k];
              var string = examLink[i].name + "_exam_" + examLink[i].exam[j].name;
              string += "_" + examLink[i].exam[j].file[k];
                  // string ex: biology_exam_第一次期中_103-1
                  link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
    
                  subexam_body.appendChild(link);
                  }
                  subexam.appendChild(subexam_body);
              subblock.appendChild(subexam);
    
              exam_body.appendChild(subblock);
          }
          exam.appendChild(exam_body);
          block.appendChild(exam);
          */
            card_reveal.appendChild(block);
          break;
          }	
        }
    card.appendChild(card_reveal);
    main_container.appendChild(card);

    enableCols();
  }
}
function add_in_right_bar(string){

	
  // string ex: biology_quiz_第一次小考_103-1
	var element = document.getElementById("li: " + string);
	if(element == null){

  	var right_bar = document.getElementById("right_bar");
  		var li = document.createElement("li");
  		li.setAttribute("id", "li: " + string);
  			var a = document.createElement("a");
  			a.setAttribute("class", "left");
  			a.innerHTML = string;
  		li.appendChild(a);
  			var icon_out = document.createElement("i");
			icon_out.setAttribute("class", "material-icons right red-text waves-effect waves-light");
			icon_out.setAttribute("style", "position: relative;");
			icon_out.innerHTML = "close";
			icon_out.onclick=function(){
				right_bar.removeChild(li);
			}
		li.appendChild(icon_out);
  	right_bar.appendChild(li);
  	document.getElementById("btn-submit").disabled = false;
	}
}
function remove_in_right_bar(string){
  document.getElementById("right_bar").removeChild(document.getElementById("li: " + string));
}

function enableCols(){
  $('.collapsible').collapsible({
    accordion : false 
  });
}

function submit(){
  document.getElementById("btn-submit").disabled = true;
  var strings = [];
  var right_bar = document.getElementById("right_bar");
  var elements = right_bar.children;
  console.log("submit");
  for(var i = 0; i < elements.length; ++i){
    if(elements[i].nodeName === "LI"){
      strings.push(elements[i].children[0].innerHTML);
      right_bar.removeChild(elements[i]);
      --i;
    }
  }

  //var dataString = "";
  for(var i = 0; i < strings.length; ++i){
    console.log(strings[i]);                                              // strings are all needed to be submitted
    //dataString += strings[i] + " ";
  }
  socket.emit('submit', {id: "b00000000", data: strings}, function(goodStat, position){
    if(goodStat == 1){
      console.log("Start download.");
      var download = document.getElementById('for_download');
      download.href = position;
      download.click();
    }
  });
}





function Back(str){
  var disp = document.getElementsByClassName("1e" + str);
  for(var i = 0; i < disp.length; i++){
    disp[i].style.display = "none";
  }
  var disp = document.getElementsByClassName("1q" + str);
  for(var i = 0; i < disp.length; i++){
    disp[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("0" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "none";
}
function getQuiz(str){
  var disa = document.getElementsByClassName("0" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var disa = document.getElementsByClassName("2q" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("1q" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "Back(\"" + str + "\")");
}
function getExam(str){
  var disa = document.getElementsByClassName("0" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var disa = document.getElementsByClassName("2e" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("1e" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "Back(\"" + str + "\")");
}
function getQfile(str){
  var disa = document.getElementsByClassName("1q" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("2q" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "getQuiz(\"" + str + "\")");
}
function getEfile(str){
  var disa = document.getElementsByClassName("1e" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("2e" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "getExam(\"" + str + "\")");
}

function wrapper(obj, classN, display){
  var wrap = document.createElement("div");
  wrap.setAttribute("class", classN + " Flex");
  if(display)
    wrap.setAttribute("style", "display: flex; align-items: center");
  else
    wrap.setAttribute("style", "display: none; align-items: center");
  wrap.appendChild(obj);
  return wrap;
}
// vim: set ts=2 sw=2 sts=2 tw=0 et :
