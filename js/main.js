var nameMap = new Map();
var names = [
"微積分甲上",
"普通物理學甲上",
"計算機程式",
"生物科學通論",
"普通化學丙",

"微積分甲下",
"普通物理學甲下",
"計算機概論",
"工程數學-線性代數",

"電子學一",
"電路學",
"工程數學-微分方程",
"交換電路與邏輯設計",

"電子學二",
"電磁學一",
"信號與系統",
"機率與統計",
"工程數學-複變",
"離散數學",

"電子學三",
"電磁學二"

];

for(var i = 0; i < names.length; i++){
    nameMap.set(names[i], 0);
}

var numOfCard = 0;
function add(obj){
  console.log("adding");
  console.log(obj.innerHTML);
  var main_container = document.getElementById("main_container");
  
  if(nameMap.get(obj.innerHTML) == 1){
	  main_container.removeChild((document.getElementsByClassName(obj.innerHTML))[0]);
	  nameMap.set(obj.innerHTML, 0);
  }
  else{
	  nameMap.set(obj.innerHTML, 1);
			var card = document.createElement("div");
			card.setAttribute("id", "card"+numOfCard);
			card.setAttribute("class", "card " + obj.innerHTML);
			card.setAttribute("style", "position: relative; display: inline-block; margin:2.5%; width:35%; height:30%");
				var card_image = document.createElement("div");
				card_image.setAttribute("class", "card-image waves-effect waves-block waves-light");
					var img = document.createElement("img");
					img.setAttribute("class", "activator");
					img.setAttribute("margin", "0");
					img.setAttribute("bolder", "0");
					img.setAttribute("src", "images/electronics.jpg");
					img.setAttribute("style", "width: 40%; height: auto;");
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
						var content = document.createElement("i");
						content.innerHTML = "links...";
					card_title2.appendChild(content);
				card_reveal.appendChild(card_title2);
			card.appendChild(card_reveal);

    main_container.appendChild(card);
    numOfCard ++;
  }
}

