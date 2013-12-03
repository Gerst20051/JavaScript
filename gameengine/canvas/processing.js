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
	SQUARE: "butt",
	ROUND: "round",
	PROJECT: "square",
	MITER: "miter",
	BEVEL: "bevel",
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 10,
	RETURN: 13,
	ESC: 27,
	DELETE: 127,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	CAPSLK: 20,
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
	NUMLK: 144,
	META: 157,
	INSERT: 155,
	ARROW: "default",
	CROSS: "crosshair",
	HAND: "pointer",
	MOVE: "move",
	TEXT: "text",
	WAIT: "wait",
	NOCURSOR: "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",
};

var p = this;
p.focused = false;
p.pmouseX = 0;
p.pmouseY = 0;
p.mouseX = 0;
p.mouseY = 0;
p.mouseButton = 0;
p.mouseScroll = 0;
p.mouseClicked = undef;
p.mouseDragged = undef;
p.mouseMoved = undef;
p.mousePressed = undef;
p.mouseReleased = undef;
p.mouseScrolled = undef;
p.mouseOver = undef;
p.mouseOut = undef;
p.key = undef;
p.keyCode = undef;
p.keyPressed = nop;
p.keyReleased = nop;
p.keyTyped = nop;
p.draw = undef;
p.setup = undef;
p.__mousePressed = false;
p.__keyPressed = false;
p.__frameRate = 60;
p.frameCount = 0;
p.width = 400;
p.height = 400;

var curContext, drawing,
	doFill = true,
	fillStyle = [1, 1, 1, 1],
	currentFillColor = 4294967295,
	isFillDirty = true,
	doStroke = true,
	strokeStyle = [0, 0, 0, 1],
	currentStrokeColor = 4278190080,
	isStrokeDirty = true,
	lineWidth = 1,
	loopStarted = false,
	renderSmooth = false,
	doLoop = true,
	looping = 0,
	curRectMode = 0,
	curEllipseMode = 3,
	normalX = 0,
	normalY = 0,
	normalMode = 0,
	curFrameRate = 60,
	curMsPerFrame = 1E3 / curFrameRate,
	curCursor = 'default',
	oldCursor = curElement.style.cursor,
	curShape = 20,
	curShapeCount = 0,
	curvePoints = [],
	curTightness = 0,
	curveDet = 20,
	curveInited = false,
	backgroundObj = -3355444,
	bezDetail = 20,
	colorModeX = 255,
	colorModeY = 255,
	pathOpen = false,
	mouseDragging = false,
	pmouseXLastFrame = 0,
	pmouseYLastFrame = 0,
	curColorMode = 1,
	getLoaded = false,
	start = Date.now(),
	timeSinceLastFPS = start,
	framesSinceLastFPS = 0,
	textcanvas, curveBasisMatrix, curveToBezierMatrix, curveDrawMatrix, bezierDrawMatrix, bezierBasisInverse, bezierBasisMatrix, curContextCache = {
		attributes: {},
		locations: {}
	},
	programObject3D, programObject2D, programObjectUnlitShape, boxBuffer, boxNormBuffer, boxOutlineBuffer, rectBuffer, rectNormBuffer, sphereBuffer, lineBuffer, fillBuffer, fillColorBuffer, strokeColorBuffer, pointBuffer, shapeTexVBO, canTex, textTex, curTexture = {
		width: 0,
		height: 0
	},
	curFontName = "Arial",
	curTextSize = 12,
	originalContext, proxyContext = null,
	isContextReplaced = false,
	pressedKeysMap = [],
	lastPressedKeyCode = null;

Drawing2D.prototype.init = function() {
	p.size(p.width, p.height);
	curContext.lineCap = "round";
	p.noSmooth();
	p.disableContextMenu();
};

function getCanvasData(obj, w, h){
	var canvasData = canvasDataCache.shift();
	if (canvasData === undef) {
		canvasData = {};
		canvasData.canvas = document.createElement("canvas");
		canvasData.context = canvasData.canvas.getContext("2d");
	}
	canvasDataCache.push(canvasData);
	var canvas = canvasData.canvas,
	context = canvasData.context,
	width = w || obj.width,
	height = h || obj.height;
	canvas.width = width;
	canvas.height = height;
	if (!obj) context.clearRect(0, 0, width, height);
	else if ("data" in obj) context.putImageData(obj, 0, 0);
	else {
		context.clearRect(0, 0, width, height);
		context.drawImage(obj, 0, 0, width, height);
	}
	return canvasData;
}

function calculateOffset(curElement, event){
	var element = curElement,
		offsetX = 0,
		offsetY = 0;
		p.pmouseX = p.mouseX;
		p.pmouseY = p.mouseY;
	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ( !! (element = element.offsetParent));
	}
	element = curElement;
	do {
		offsetX -= element.scrollLeft || 0;
		offsetY -= element.scrollTop || 0
	} while ( !! (element = element.parentNode));
	offsetX += stylePaddingLeft;
	offsetY += stylePaddingTop;
	offsetX += styleBorderLeft;
	offsetY += styleBorderTop;
	offsetX += window.pageXOffset;
	offsetY += window.pageYOffset;
	return {
		"X": offsetX,
		"Y": offsetY
	}
}

function updateMousePosition(curElement, event){
	var offset = calculateOffset(curElement, event);
	p.mouseX = event.pageX - offset.X;
	p.mouseY = event.pageY - offset.Y;
}

function getKeyCode(e){
	var code = e.which || e.keyCode;
	switch (code) {
		case 13:
			return 10;
		case 91:
		case 93:
		case 224:
			return 157;
		case 57392:
			return 17;
		case 46:
			return 127;
		case 45:
			return 155;
	}
	return code;
}

function getKeyChar(e){
	var c = e.which || e.keyCode;
	var anyShiftPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;
	switch (c) {
		case 13:
			c = anyShiftPressed ? 13 : 10;
			break;
		case 8:
			c = anyShiftPressed ? 127 : 8;
			break;
	}
	return new Char(c);
}

Drawing2D.prototype.background = function(arg1, arg2, arg3, arg4) {
	if (arg1 !== undef) backgroundHelper(arg1, arg2, arg3, arg4);
	if (backgroundObj instanceof PImage || backgroundObj.__isPImage) {
		saveContext();
		curContext.setTransform(1, 0, 0, 1, 0, 0);
		p.image(backgroundObj, 0, 0);
		restoreContext()
	} else {
		saveContext();
		curContext.setTransform(1, 0, 0, 1, 0, 0);
		if (p.alpha(backgroundObj) !== colorModeA) curContext.clearRect(0, 0, p.width, p.height);
		curContext.fillStyle = p.color.toString(backgroundObj);
		curContext.fillRect(0, 0, p.width, p.height);
		isFillDirty = true;
		restoreContext()
	}
};
