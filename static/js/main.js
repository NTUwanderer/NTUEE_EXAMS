var nameMap = new Map();


var subjects = [
  // 中文,       English,    image location,        on screen, 上學期: false
  ["計算機程式", "cprogram", "images/cprograming.jpg", false, false],

  ["計算機概論", "cscience", "images/cscience.jpg", false, true],
  ["工程數學-線性代數", "linear", "images/linear.jpg", false, true],

  ["電子學一", "electron1", "images/electron1.jpg", false, false],
  ["電路學", "circuit", "images/circuit.jpg", false, false],
  ["工程數學-微分方程", "diff", "images/diff.jpg", false, false],
  ["交換電路與邏輯設計", "logic", "images/logic.jpg", false, false],
  ["電子電路實驗一", "eexp1", "images/eexp1.jpg", false, false], //

  ["電子學二", "electron2", "images/electron2.jpg", false, true],
  ["電磁學一", "electrom1", "images/electrom1.jpg", false, true],
  ["信號與系統", "signal", "images/signal.jpg", false, true],
  ["機率與統計", "probability", "images/probability.jpg", false, true],
  ["工程數學-複變", "complex", "images/complex.jpg", false, true],
  ["離散數學", "discrete", "images/discrete.jpg", false, true],

  ["電子學三", "electron3", "images/electron3.jpg", false, false],
  ["電磁學二", "electrom2", "images/electrom2.jpg", false, false],
  ["電子電路實驗三", "eexp3", "images/eexp3.jpg", false, false], //
//Minor
  ["演算法", "algorithm", "images/algorithm.jpg", false, 3],
  ["生醫工程概論", "bioEng", "images/bioEng.jpg", false, 3],
  ["計算機結構", "carch", "images/carch.jpg", false, 3],
  ["電腦網路導論", "cnetwork", "images/cnetwork.jpg", false, 3],
  ["控制系統", "control", "images/control.jpg", false, 3],
  ["資料結構", "DSnP", "images/electrom2.jpg", false, 3],
  ["微波系統導論", "microEng", "images/microEng.jpg", false, 3],
  ["近代物理", "mPhy", "images/mPhy.jpg", false, 3],
  ["物件導向程式設計", "OOP", "images/OOP.jpg", false, 3],
  ["通訊原理", "PC", "images/PC.jpg", false, 3],
  ["電力工程導論", "powerSys", "images/powerSys.jpg", false, 3],
  ["半導體製程", "SCTech", "images/SCTech.jpg", false, 3],
  ["積體電路設計", "VLSI", "images/VLSI.jpg", false, 3]

  ];

  for(var i = 0; i < subjects.length; i++){
    nameMap.set(subjects[i][0], i);
  }

var socket = io.connect();
socket.emit('initial', {id: "b00000000"}, function(data, exams){
  //console.log("card init.", data);
  //console.log("exams init.", exams);
  examLink = exams;
  /*if(data !== 'undefined'){
    for(var i = 0; i < 30; i++){
      if(data[i] == true){
        add(document.getElementById(subjects[i][0]));
      }
    }
  }*/
  //console.log("In main.js get examLink:", examLink);
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
    card.setAttribute("style", "position: relative; display: inline-block; margin:2.5% 0 0 2.5%; width:33%; height:100");
	
      var card_content = document.createElement("div");
      card_content.setAttribute("class", "card-content");
        var card_title = document.createElement("span");
        card_title.setAttribute("class", "card-title grey-text text-darken-4");
        card_title.innerHTML = obj.innerHTML; // need to be dynamic
          var icon = document.createElement("i");
          icon.setAttribute("class", "material-icons right red-text");
          icon.setAttribute("style", "position: relative; top: 10px; cursor: pointer")
          icon.innerHTML = "close";
          icon.onclick = function(){
			var temp = document.getElementById("card: " + subjects[index][0]);
			if(temp != null)	main_container.removeChild(temp);
			subjects[index][3] = false;
			}
        card_title.appendChild(icon);
	card_content.appendChild(card_title);
		
    
    

        for(var i = 0; i < examLink.length; i++){
          if(examLink[i].name == subjects[index][1]){
            card.setAttribute("data-baseIndex", i);
    
            var block = document.createElement("div");
            block.setAttribute("class", "card-block");
            var alltok = [];
              var quiz = document.createElement("a");
              quiz.setAttribute("style", "display: inline-block; margin-left: 15px; font-size: 20px; cursor: pointer");
              quiz.setAttribute("onclick", "getQuiz(\"" + subjects[index][1] + "\"" + "," + "\"-1\"" + ")");
              quiz.innerHTML = "quiz";
            alltok.push(wrapper(quiz, "0" + subjects[index][1], true));
              var exam = document.createElement("a");
              exam.setAttribute("style", "display: inline-block; margin-left: 15px; font-size: 20px; cursor: pointer");
              exam.setAttribute("onclick", "getExam(\"" + subjects[index][1] + "\"" + "," + "\"-1\"" + ")");
              exam.innerHTML = "exam";
            alltok.push(wrapper(exam, "0" + subjects[index][1], true));
              var icon = document.createElement("i");
              icon.setAttribute("class", "material-icons ");
              icon.setAttribute("id", "icon" + subjects[index][1]);
              icon.style.position = "absolute";
              icon.style.top = "calc(100% - 24px)";
              icon.style.left = "calc(100% - 27px)";
              icon.style.display = "none";
              icon.style.cursor = "pointer";
              icon.innerHTML = "keyboard_return";
            alltok.push(icon);
              for(var j = 0; j < examLink[i].quiz.length; j++){
                var subquiz = document.createElement("a");
                subquiz.setAttribute("onclick", "getQfile(\""+ subjects[index][1] + "\"" + "," + j.toString() + ")");
                subquiz.setAttribute("style", "margin-left: 15px; font-size: 18px; cursor: pointer");
                subquiz.innerHTML = examLink[i].quiz[j].name;
                alltok.push(wrapper(subquiz, "1q" + subjects[index][1], false));
                for(var k = 0; k < examLink[i].quiz[j].file.length; k++){
                  var link = document.createElement("a");
                  link.setAttribute("style", "padding: 3px; cursor: pointer");
                  link.innerHTML = examLink[i].quiz[j].file[k];
                  var string = examLink[i].name + "@quiz-" + (j+1).toString();
                  string += "_" + examLink[i].quiz[j].file[k];
                  // string ex: biology_quiz_第一次小考_103-1
                  link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
               
                  alltok.push(wrapper(link, "2q" + subjects[index][1] + j.toString(), false));
                }
              }
              for(var j = 0; j < examLink[i].exam.length; j++){
                var subexam = document.createElement("a");
                subexam.setAttribute("onclick", "getEfile(\"" + subjects[index][1] + "\"" + "," + j.toString() + ")");
                subexam.setAttribute("style", " margin-left: 15px; font-size: 18px; cursor: pointer");
                subexam.innerHTML = examLink[i].exam[j].name;
                alltok.push(wrapper(subexam, "1e" + subjects[index][1], false));
                for(var k = 0; k < examLink[i].exam[j].file.length; k++){
                  var link = document.createElement("a");
                  link.innerHTML = examLink[i].exam[j].file[k];
                  link.setAttribute("style", "padding: 3px; cursor: pointer");
                  var string = examLink[i].name + "@exam-" + (j+1).toString();
                  string += "_" + examLink[i].exam[j].file[k];
                  // string ex: biology_quiz_第一次小考_103-1
                  link.setAttribute("onclick", "add_in_right_bar(\"" + string + "\")");
    
                  alltok.push(wrapper(link, "2e" + subjects[index][1] + j.toString(), false));
                }
              }
              for(var i = 0; i < alltok.length; i++){
                block.appendChild(alltok[i]);
              }                                
              
            card_content.appendChild(block);
          break;
          }	
        }
    card.appendChild(card_content);
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
      li.setAttribute("style", "height: 30px;");
  			var icon_out = document.createElement("i");
			  icon_out.setAttribute("class", "material-icons left red-text waves-effect waves-light");
			  icon_out.setAttribute("style", "position: relative; display: inline-block; float: left; padding: 0px; margin: 0px; cursor: pointer");
			  icon_out.innerHTML = "close";
			    icon_out.onclick=function(){
			    }
		  li.appendChild(icon_out);
  			var a = document.createElement("a");
  			//a.setAttribute("class", "left");
        a.setAttribute("style", "line-height: 26px; cursor: default; color: black; padding-left: 3px;");
  			a.innerHTML = string;
  		li.appendChild(a);
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

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function submit(){
  document.getElementById("btn-submit").disabled = true;
  var strings = [];
  var right_bar = document.getElementById("right_bar");
  var elements = right_bar.children;
  console.log("submit");
  for(var i = 0; i < elements.length; ++i){
    if(elements[i].nodeName === "LI"){
      strings.push(elements[i].children[1].innerHTML);
      right_bar.removeChild(elements[i]);
      --i;
    }
  }

  //var dataString = "";
  for(var i = 0; i < strings.length; ++i){
    console.log(strings[i]);                                    // strings are all needed to be submitted
  }
  socket.emit('submit', {id: "b00000000", data: strings}, function(goodStat, data){
    if(goodStat == 1){
      console.log("Start download.");
      //console.log("data : ", data);
      var blob = b64toBlob(data, "application/octet-stream");

      saveAs(blob, "b00000000.zip");
      /*var download = document.getElementById('for_download');
      download.href = position;
      download.click();*/
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
    appe[i].style.display = "-webkit-flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "none";
}
function getQuiz(str, num){
  var disa = document.getElementsByClassName("0" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  if(num != "-1"){
    var disa = document.getElementsByClassName("2q" + str + num);
    for(var i = 0; i < disa.length; i++){
      disa[i].style.display = "none";
    }
  }
  var appe = document.getElementsByClassName("1q" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
    appe[i].style.display = "-webkit-flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "Back(\"" + str + "\")");
}
function getExam(str, num){
  var disa = document.getElementsByClassName("0" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  if(num != "-1"){
    var disa = document.getElementsByClassName("2e" + str + num);
    for(var i = 0; i < disa.length; i++){
      disa[i].style.display = "none";
    }
  }
  var appe = document.getElementsByClassName("1e" + str);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
    appe[i].style.display = "-webkit-flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "Back(\"" + str + "\")");
}
function getQfile(str, num){
  var disa = document.getElementsByClassName("1q" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("2q" + str + num);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
    appe[i].style.display = "-webkit-flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "getQuiz(\"" + str + "\"" + "," + num + ")");
}
function getEfile(str, num){
  var disa = document.getElementsByClassName("1e" + str);
  for(var i = 0; i < disa.length; i++){
    disa[i].style.display = "none";
  }
  var appe = document.getElementsByClassName("2e" + str + num);
  for(var i = 0; i < appe.length; i++){
    appe[i].style.display = "flex";
    appe[i].style.display = "-webkit-flex";
  }
  var button = document.getElementById("icon" + str);
  button.style.display = "inline-block";
  button.setAttribute("onclick", "getExam(\"" + str + "\"" + "," + num + ")");
}

function wrapper(obj, classN, display){
  var wrap = document.createElement("div");
  wrap.setAttribute("class", classN + " Flex");
  if(display){
    wrap.setAttribute("style", "align-items: center");
    wrap.style.display = "flex";
    wrap.style.display = "-webkit-flex";
  }
  else{
    wrap.setAttribute("style", "display: none; align-items: center");
  }
  wrap.appendChild(obj);
  return wrap;
}
// vim: set ts=2 sw=2 sts=2 tw=0 et :
