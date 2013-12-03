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
canvas = {
	X: 0,
	Y: 0,
	Z: 0,
	R: 0,
	G: 0,
	B: 0,
	A: 0,
};

var nop = function(){},
	debug = function(){
		if ("console" in window) return function(msg){
			window.console.log("Processing.js: " + msg);
		};
		return nop
	}(),
	noStroke = function(){

	},
	draw = function(){

	},
	background = function(){

	},
	textSize = function(){

	},
	fill = function(){

	},
	text = function(){

	},
	line = function(){

	},
	rect = function(){

	},
	mouseClicked = function(){

	};






