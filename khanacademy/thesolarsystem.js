// Simulating the solar system
// Information from http://www.enchantedlearning.com/subjects/astronomy/planets/

//speed. 1/year
var mercurySpeed = 365.26/87.96;
var venusSpeed =  365.26/224.68;
var earthSpeed = 1;
var marsSpeed = 365.26/686.98;
var jupiterSpeed = 1/11.862;
var saturnSpeed = 1/29.456;
var uranusSpeed = 1/84.07;
var neptuneSpeed = 1/164.81;
var plutoSpeed = 1/247.7;

//size
var mercurySize = 5;
var venusSize = 10;
var earthSize = 10;
var marsSize = 7;
var jupiterSize = 20;
var saturnSize = 15;
var uranusSize = 10;
var neptuneSize = 10;
var plutoSize = 5;

// Orbit 
var mercuryOrbit = 1;
var venusOrbit = 2;
var earthOrbit = 3;
var marsOrbit = 4;
var jupiterOrbit = 5;
var saturnOrbit = 6;
var uranusOrbit = 7;
var neptuneOrbit = 8;
var plutoOrbit = 9;

// These control the shape of the orbits
var baseSize = 50;
var incrX = 30;
var incrY = 20;

var drawPlanet = function(time, speed, orbit, size){
	// Draw the planet on a particular orbit
	var degree = (time * speed)  % 360;

	// Calulate the position of the planet
	var radiusX = (baseSize + incrX * pow(orbit, 1.1)) / 2;
	var radiusY = (baseSize + incrY * pow(orbit, 1.1)) / 2;
	var positionX = radiusX * cos(degree);
	var positionY = radiusY * sin(degree);

	// Draw the planet
	ellipse(positionX, positionY, size, size);

	// Saturn ring
	if (orbit === saturnOrbit) {
		ellipse(positionX, positionY, 1.5*size, 0.25*size);
	}
	// Pluto may not be a planet?
	if (orbit === plutoOrbit) {
		text('?', positionX, positionY);
	}
};

var drawSolarSystem = function(time){
	// Draw the solar system
	background(0, 0, 0);
	// Sun
	noStroke();
	fill(255, 255, 0);
	ellipse(0, 0, baseSize, baseSize);

	// Draw the orbits first
	noFill();
	stroke(92, 92, 92);
	strokeWeight(1);
	for (var i = 1; i <= 9; i+=1) {
		var diameterX = baseSize + incrX * pow(i, 1.1);
		var diameterY = baseSize + incrY * pow(i, 1.1);
		ellipse(0, 0, diameterX, diameterY);
	}

	// Mercury
	noStroke();
	fill(219, 217, 212);
	drawPlanet(time, mercurySpeed, mercuryOrbit, mercurySize); 
	// Venus
	fill(205, 212, 106);
	drawPlanet(time, venusSpeed, venusOrbit, venusSize);
	// Earth
	fill(36, 136, 212);
	drawPlanet(time, earthSpeed, earthOrbit, earthSize);
	// Mars
	fill(255,0,0);
	drawPlanet(time, marsSpeed, marsOrbit, marsSize);
	// Jupiter 
	fill(173, 107, 37);
	drawPlanet(time, jupiterSpeed, jupiterOrbit, jupiterSize);
	// Saturn
	fill(163, 131, 77);
	drawPlanet(time, saturnSpeed, saturnOrbit, saturnSize);
	// Uranus
	fill(113, 222, 230);
	drawPlanet(time, uranusSpeed, uranusOrbit, uranusSize);
	// Neptune
	fill(206, 89, 235);
	drawPlanet(time, neptuneSpeed, neptuneOrbit, neptuneSize);
	// Pluto
	fill(240, 57, 130);
	drawPlanet(time, plutoSpeed, plutoOrbit, plutoSize);
};

var speed = 100; // Change the speed and see what happens!  
var currentTime = 0;
var draw = function(){
	resetMatrix();
	translate(200, 200);
	drawSolarSystem(currentTime);
	currentTime += speed;
};
