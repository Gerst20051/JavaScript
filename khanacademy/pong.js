noStroke();

var paddleWidth = 100;
var initialSpeedX = 5;
var initialSpeedY = -6;
var ballSpeedX = initialSpeedX;
var ballSpeedY = initialSpeedY;
var ballX = 0;
var ballY = 0;
var ballMoving = false;
var started = false;
var colorVal = 0;
var dir = 1;
var level = 0;
var oldlevel = 0;
var record = 0;
var oldrecord = 0;

var draw = function(){
	if (ballMoving === true) {
		if (0 < dir && colorVal < 255) {
			colorVal++;
		} else if (0 > dir && 0 < colorVal) {
			colorVal--;
		} else if (colorVal === 255 || colorVal === 0) {
			dir = -dir;
		}
	}

	background(0, 108, colorVal);

	if (0 < level) {
		textSize(12);
		fill(240, 126, 65);
		text('Level: ' + level, 10, 20);
	}

	if (ballMoving === true || started === false) {
		fill(240, 126, 65);
		rect(mouseX - paddleWidth/2, 350, paddleWidth, 10);
	}

	if (ballMoving) {
		ballX += ballSpeedX;
		ballY += ballSpeedY;
	} else {
		ballX = mouseX;
		ballY = 340;
		textSize(20);
		if (0 < level) {
			oldlevel = level;
		}
		if (oldlevel >= oldrecord && started === true) {
			fill(255, 0, 0);
			text('Congrats '+'New'+' Record!', 90, 150);
			textSize(16);
			fill(0, 0, 0);
			text('New'+' Record: ' + oldlevel, 143, 220);
			text('Old Record: ' + oldrecord, 150, 250);
			if (0 < level) {
				record = level;
				oldrecord = level;
			}
		} else if (started === true) {
			fill(255, 0, 0);
			text('Game Over', 150, 150);
			textSize(16);
			fill(0, 0, 0);
			text('Level: ' + oldlevel, 179, 220);
			text('Your Record: ' + oldrecord, 130, 250);
		}
		level = 0;
		record = 0;
	}

	if (ballMoving === true || started === false) {
		fill(255, 234, 0);
		ellipse(ballX, ballY, 20, 20);
	}

	if (ballY <= 10) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballX <= 10) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballX >= 390) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballY >= 340 && ballY < 346 && ballX >= mouseX - (paddleWidth)/2 - 10 && ballX <= mouseX + (paddleWidth)/2 + 10) {
		ballSpeedY = -ballSpeedY;
		if (ballMoving === true) {
			level += 1;
			ballSpeedX += (0 < ballSpeedX) ? 1 : -1;
			ballSpeedY += (0 < ballSpeedY) ? 1 : -1;
		}
	}
	if (ballY >= 400) {
		ballMoving = false;
	}
};

var mouseClicked = function(){
	if (!ballMoving) {
		ballSpeedX = initialSpeedX;
		ballSpeedY = initialSpeedY;
		ballMoving = true;
		started = true;
	}
};
