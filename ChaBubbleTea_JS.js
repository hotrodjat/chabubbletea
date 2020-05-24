var transition_done = true;
var main = document.getElementById("main");
var currentWidth = window.innerWidth;

var timer = 0;

window.onload = function () {
	if (currentWidth < 770) {
		main.style.marginTop = "400px";
		description.style.textAlign = "center";
		description.style.fontSize = "40px";
		description.style.marginTop = "20px";
	}
	else {
		main.style.marginTop = "50px";
		description.style.marginTop = "250px";
	}
}

window.onresize = function () {
	window.onresize = function () {
		var newWidth = window.innerWidth;
		if (newWidth > 1350) {
			main.style.marginTop = "50px";
			description.style.marginTop = "250px";
			description.style.textAlign = "center";
		}
		if (newWidth < 1350 && newWidth > 1200) {
			description.style.textAlign = "right";
			description.style.marginTop = "250px";
			main.style.marginTop = "50px";
		}
		if (newWidth < 1200) {
			description.style.marginTop = "20px";
			description.style.textAlign = "center";
			main.style.marginTop = "50px";
		}
		if (newWidth < 700) {
			main.style.marginTop = "400px";
		}
	}
}



//image slideshow////////////////////////////////////////
const image_container = document.querySelector(".slideshow-images");
const images = document.querySelectorAll(".slideshow-images img");

//buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

var counter = 0;
const size = images[0].clientWidth;


image_container.style.transform = 'translateX(-' + size + 'px)';
counter++;

nextBtn.addEventListener('click', function () {
	if (counter >= images.length - 1) return;
	counter++;
	image_container.style.transition = 'transform 1s ease-in-out';
	image_container.style.transform = 'translateX(' + (-size * counter) + 'px)';
	timer = 0;
	if (transition_done) {
		$("#description").fadeTo('fast', 0.01);
		transition_done = false;
	}
	setTimeout(changeDescription, 500);
})

prevBtn.addEventListener('click', function () {
	if (counter <= 0) return;
	counter--;
	image_container.style.transition = 'transform 1s ease-in-out';
	image_container.style.transform = 'translateX(' + (-size * counter) + 'px)';
	timer = 0;
	if (transition_done) {
		$("#description").fadeTo('slow', 0.01);
		transition_done = false;
	}
	setTimeout(changeDescription, 500);
})

image_container.addEventListener('transitionstart', function () {
	if (transition_done) {
		$("#description").fadeTo('slow', 0.01);
		transition_done = false;
	}
	setTimeout(changeDescription, 500);
})


image_container.addEventListener('transitionend', function () {
	if (images[counter].id === "last-clone") {
		image_container.style.transition = 'none';
		//this brings slideshow back to last image
		counter = images.length - 2;
		image_container.style.transform = 'translateX(' + (-size * counter) + 'px)';
	}

	if (images[counter].id === "first-clone") {
		image_container.style.transition = 'none';
		//this brings slideshow back to first image
		counter = images.length - 19;
		image_container.style.transform = 'translateX(' + (-size * counter) + 'px)';

	}

	$("#description").fadeTo(500, 1);
	transition_done = true;

})

var change = setInterval(changePic, 1000);

function changePic() {
	timer++;
	if (timer >= 5) {
		if (counter >= images.length - 1) return;
		{
			counter++;
			image_container.style.transition = 'transform 1s ease-in-out';
			image_container.style.transform = 'translateX(' + (-size * counter) + 'px)';
		}
		timer = 0;
	}
}
/////////////////////////////////////////////////////


//text that goes along with slideshow////////////////
var description = document.getElementById('description');
var descriptionArray = ["Tiger Sugar Milk Tea", "Mango Black Milk Tea", "cha 3", 
"cha 4", "cha 7", "Kiwi Punch with Pineapple Whip (new rainbow jelly)", 
"Matcha Milk Tea with Boba and Red Bean", "Mochi Ice Cream", "Mochi Pops", 
"Oolong Milk Tea", "Peach-Mango Punch (Pango Punch)", 
"Pinacolada Slush", "Sparking Passion Lemonade", "Strawberry Lemonade", 
"Strawberry Matcha LAtte", "Strawberry Watermelon Lemonade", "Taro Slush", 
"Thai Tea", "Tiger Sugar Milk Tea", "Man Black Milk Tea"];

description.innerHTML = descriptionArray[1];

function changeDescription() {
	//description.style.fontSize = '10px'; //works but not what we want
	//look at line 58 for reference
	
	description.innerHTML = descriptionArray[counter];
}


//Focuses the items in menu on mouseover
var areas = document.getElementsByTagName('area');
for (var index = 0; index < areas.length; index++) {
	areas[index].addEventListener('mouseover', function () { this.focus(); }, false);
};

//this is used to implement the Javascript Google Maps API
function initMap() {
	//the latitude and longitude of Cha Bubble Tea: 36.060227, -95.884389
	//we store the location of Cha Bubble Tea as a latitude and longitude
	var chaBubbleTea = {lat: 36.060227, lng: -95.884389};
	//this creates the map and centers it on the location of chaBubbleTea
	var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: chaBubbleTea});
	//this creates the marker that will be placed on the map
	var marker = new google.maps.Marker({position: chaBubbleTea, map: map});
}
