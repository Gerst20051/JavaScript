window.requestAnimFrame = (function requestAnimFrame(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback){
		window.setTimeout(callback, 1000 / 60);
	}
})();

(function(){
	var lastTime = 0,
		vendors = ['webkit', 'moz', 'ms', 'o'];

	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element){
		var currTime = +new Date;
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function(){ callback(currTime + timeToCall); }, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id){
		clearTimeout(id);
	};
}());

var undef, constants = {
	EPSILON: 1.0E-4,
	MAX_FLOAT: 3.4028235E38,
	MIN_FLOAT: -3.4028235E38,
	MAX_INT: 2147483647,
	MIN_INT: -2147483648,
	PI: Math.PI,
	TWO_PI: 2 * Math.PI,
	HALF_PI: Math.PI / 2,
	THIRD_PI: Math.PI / 3,
	QUARTER_PI: Math.PI / 4,
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	WHITESPACE: " \t\n\r\u000c\u00a0",
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 10,
	RETURN: 13,
	ESC: 27,
	DELETE: 127,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	PGUP: 33,
	PGDN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	ARROW: "default",
	CROSS: "crosshair",
	HAND: "pointer",
	MOVE: "move",
	TEXT: "text",
	WAIT: "wait",
	NOCURSOR: "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",
},
c = {
	W: 0,
	H: 0,
	X: 0,
	Y: 0,
	background: "rgba(0, 0, 0, 1)",
	fillStyle: "rgba(0, 0, 0, 1)",
	fill: true,
	strokeStyle: "rgba(0, 0, 0, 1)",
	lineWidth: 1,
	stroke: true,
	color: [0, 0, 0, 0],
	font: "Arial",
	fontSize: 12,
	mouseX: 0,
	mouseY: 0,
	mousePressed: false,
	keyIsPressed: false
},
nop = function(){},
debug = function(){
	if ("console" in window) return function(msg){
		window.console.log("Debug: " + msg);
	};
	return nop;
}(),
size = function(w, h){
	canvas.size(w, h);
},
reload = function(){
	context.lineWidth = c.lineWidth;
	context.strokeStyle = c.strokeStyle;
	//context.stroke();
},
/* Shapes */
point = function(x, y){ // draw a point
	context.fillRect(x, y, c.lineWidth, c.lineWidth);
},
line = function(x1, y1, x2, y2){ // draw a line

},
rect = function(x, y, w, h){ // draw a rectangle
	/*
	context.fillStyle = "#009900";
	context.fillRect(10, 10, 100, 100);
	context.strokeStyle = "rgba(0, 0, 255, 0)";
	context.lineWidth = 5;
	context.strokeRect(10, 10, 100, 100);
	*/
},
arc = function(x, y, w, h, start, stop){ // draw an arc

},
circle = function(x, y, radius){ // draw a circle
	context.beginPath();
	context.arc(x, y, radius, 0, constants.PI * 2, false);
	context.closePath();
},
ellipse = function(x, y, w, h){ // draw an ellipse

},
triangle = function(x1, y1, x2, y2, x3, y3){ // draw a triangle

},
bezier = function(x1, y1, cx1, cy1, cx2, cy2, x2, y2){ // draw a bezier curve

},
quad = function(x1, y1, x2, y2, x3, y3, x4, y4){ // draw any quadrilateral

},
image = function(image, x, y){ // display an image

},
/* Coloring */
background = function(r, g, b, a){ // set the background color
	// set fillStyle
	// fillRect
},
fill = function(r, g, b, a){ // fill color for shapes / text color

},
noFill = function(){ // no fill for shapes

},
stroke = function(r, g, b, a){ // outline color for shapes / text color

},
strokeWeight = function(thickness){ // no outline for shapes
	c.lineWidth = thickness;
},
noStroke = function(){ // no outline for shapes
	c.stroke = false;
},
color = function(r, g, b, a){ // store a color in a variable

},
/* Text */
text = function(text, x, y){ // draw some text

},
textFont = function(font, size){ // changes the font of the text

},
textSize = function(size){ // change the size of text

},
/* Math */
random = function(low, high){ // generate a random number

},
dist = function(x1, y1, x2, y2){ // calculates the distance between two points

},
abs = function(num){ // take the absolute value of a number

},
log = function(num){ // take the logarithm of a number

},
pow = function(num, exponent){ // raise a number to an exponent

},
cos = function(deg){ // cake the cosine of an angle

},
sin = function(deg){ // take the sin of an angle

},
tan = function(deg){ // take the tangent of an angle

},
grid = function(interval){
	if (!interval) {
		interval = 10;
	}
	for (var x = 0.5; x <= c.W; x += interval) { // vertical
		context.moveTo(x, 0);
		context.lineTo(x, c.H);
	}
	for (var y = 0.5; y <= c.H; y += interval) { // horizontal
		context.moveTo(0, y);
		context.lineTo(c.W, y);
	}
	reload();
};

/*
fillStyle property can be a CSS color, a pattern, or a gradient.
fillRect(x, y, width, height) draws a rectangle filled with the current fill style.
strokeStyle property is like fillStyle.
strokeRect(x, y, width, height) draws an rectangle with the current stroke style. strokeRect doesn’t fill in the middle; it just draws the edges.
clearRect(x, y, width, height) clears the pixels in the specified rectangle.
*/

function Canvas(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.setup = nop;
	this.draw = nop;

	this.run = function(){
		this.size(400, 400);
		this.setup();
		this.animloop();
	};

	this.animloop = function(){
		window.requestAnimFrame(this.animloop);
		this.draw();
		context.stroke();
	}.bind(this);

	this.size = function(w, h){
		if (this.ctx) {
			this.canvas.width = c.W = w+1;
			this.canvas.height = c.H = h+1;
		}
		c.X = this.canvas.offsetLeft;
		c.Y = this.canvas.offsetTop;
	}
}
