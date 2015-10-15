var numOfCard = 0;
function add(){
	console.log("adding");
	
	var main_container = document.getElementById("main_container");
	var card = document.createElement("div");
	card.setAttribute("id", "card"+numOfCard);
	card.setAttribute("class", "card");
	if(numOfCard % 2 == 0)	card.setAttribute("style", "position: relative; left: 2.5%; width: 35%");
	else										card.setAttribute("style", "position: relative; left: 42.5%; width: 35%");
	
		var card_image = document.createElement("div");
		card_image.setAttribute("class", "card-image waves-effect waves-block waves-light");
			var img = document.createElement("img");
			img.setAttribute("class", "activator");
			img.setAttribute("margin", "0");
			img.setAttribute("bolder", "0");
			img.setAttribute("src", "images/electronics.jpg");
			img.setAttribute("style", "width: 100%; height: auto;");
		card_image.appendChild(img);
	card.appendChild(card_image);
		var card_content = document.createElement("div");
		card_content.setAttribute("class", "card-content");
			var card_title = document.createElement("span");
			card_title.setAttribute("class", "card-title activator grey-text text-darken-4");
			card_title.innerHTML = "Electronics"; // need to be dynamic
				var icon = document.createElement("i");
				icon.setAttribute("class", "material-icons right");
				icon.innerHTML = "more_vert";
			card_title.appendChild(icon);
		card_content.appendChild(card_title);
	card.appendChild(card_content);
		var card_reveal = document.createElement("div");
		card_reveal.setAttribute("class", "card-reveal");
			var card_title2 = document.createElement("span");
			card_title2.setAttribute("class", "card-title grey-text text-darken-4");
			card_title2.innerHTML = "Electronics"; // need to be dynamic
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
