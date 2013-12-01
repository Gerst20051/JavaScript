var collidePoint,
	Player,
	Asteroid,
	Scene,
	mainScene,
	player,
	asteroids,
	numAsteroids = 10,
	minAsteroidSpeed = 2,
	maxAsteroidSpeed = 8,
	minAsteroidRadius = 2,
	maxAsteroidRadius = 25,
	mapSize = {
		height: 400,
		width: 400
	},
	collideBuffer = 30,
	highframes = 0,
	frames,
	gameOver;

collidePoint = function(obj1, obj2, buffer){
	buffer = buffer || 0;
	if (dist(obj1.getX(), obj1.getY(), obj2.getX(), obj2.getY()) <= obj1.getRadius() + obj2.getRadius() + buffer) {
		return true;
	}
	return false;
};

Player = function(){
	var x, y;
	
	this.speed = 5;
	this.radius = 10;
	
	this.init = function(x, y){
		this.setPosition(x, y);
	};
	
	this.setX = function(newX){
		x = newX;
	};
	
	this.getX = function(){
		return x;
	};
	
	this.setY = function(newY){
		y = newY;
	};
	
	this.getY = function(){
		return y;
	};
	
	this.setPosition = function(newX, newY){
		x = newX;
		y = newY;
	};
	
	this.getSpeed = function(){
		return this.speed;
	};
	
	this.getRadius = function(){
		return this.radius;
	};
	
	this.step = function(){
		var spacing, safe = true;
		
		for (var i = 0, l = asteroids.length; i < l; i++) {
			if (collidePoint(player, asteroids[i], collideBuffer)) {
				spacing = player.getY() - asteroids[i].getY();
				safe = false;
				
				if (spacing > 0) {
					if (player.getY() < mapSize.height - asteroids[i].getRadius() - 5) {
						player.setY(player.getY() + player.getSpeed());
					} else {
						player.setY(player.getY() - player.getSpeed());
					}
				} else {
					if (player.getY() > asteroids[i].getRadius() + 55) {
						player.setY(player.getY() - player.getSpeed());
					} else {
						player.setY(player.getY() + player.getSpeed());
					}
				}
			}
		}
		
		if (safe === true) {
			if (player.getY() < Asteroid.prototype.radius + 100) {
				player.setY(player.getY() + (player.getSpeed() * 1.2));
			} else if (player.getY() > mapSize.height - Asteroid.prototype.radius - 50) {
				player.setY(player.getY() - (player.getSpeed() * 1.2));
			}
		}
	};
};

Asteroid = function(x, y){    
	x = x || random(mapSize.width - 50, mapSize.width + 200);
	y = y || random(0 + this.radius + 55, mapSize.height - this.radius - 5);
	
	this.setX = function(newX){
		x = newX;
	};
	
	this.getX = function(){
		return x;
	};
	
	this.setY = function(newY){
		y = newY;
	};
	
	this.getY = function(){
		return y;
	};
	
	this.setPosition = function(newX, newY){
		x = newX;
		y = newY;
	};
	
	this.getSpeed = function(){
		return this.speed;
	};
	
	this.setSpeed = function(newSpeed){
		var pivot = random(0, 100);
		if (pivot < 3) {
			this.speed = newSpeed; 
		}
	};
	
	this.getRadius = function(){
		return this.radius;
	};
	
	this.setRadius = function(newRadius){
		var pivot = random(0, 100);
		if (pivot < 3) {
			this.radius = newRadius;
		}
	};
	
	this.step = function(){
		this.setX(this.getX() - this.getSpeed());
		this.setSpeed(random(minAsteroidSpeed, maxAsteroidSpeed));
		this.setRadius(random(minAsteroidRadius, maxAsteroidRadius));
	};
};

Asteroid.prototype.radius = 20;
Asteroid.prototype.speed = 5;

Scene = function(){
	this.init = function(){
		player = new Player();
		player.init(150, 200);
		
		asteroids = [];
		this.generateAsteroids(numAsteroids);
		
		frames = 0;
		gameOver = false;
	};
	
	this.generateAsteroids = function(num){
		for (var i = 0; i < num; i++) {
			asteroids.push(new Asteroid());
		}
	};
	
	this.monitorAsteroids = function(){
		var deletedAsteroids = [];
		
		for (var i = 0, l = asteroids.length; i < l; i++) {
			if (asteroids[i].getX() <= -asteroids[i].getRadius()) {
				deletedAsteroids.push(i);
			}
		}
		
		this.generateAsteroids(deletedAsteroids.length);
		
		while (deletedAsteroids.length) {
			asteroids.splice(deletedAsteroids[0], 1);
			deletedAsteroids.splice(0, 1);
			for (i = 0; i < deletedAsteroids.length; i++) {
				deletedAsteroids[i] = deletedAsteroids[i] - 1;
			}
		}
		
		for (i = 0; i < deletedAsteroids; i++) {
			asteroids.splice(i, 1);
		}
	};
	
	this.monitorCollisions = function(){
		for (var i = 0, l = asteroids.length; i < l; i++) {
			if (collidePoint(player, asteroids[i])) {
				this.gameOver();
			}
		}
	};
	
	this.gameOver = function(){
		if (frames > highframes) {
			highframes = frames;
		}
		
		gameOver = true;
	};
	
	this.retry = function(){
		this.init();
	};
};

mainScene = new Scene();
mainScene.init();

var draw = function(){
	background(164, 177, 242);
	
	// Draw Title
	textSize(42);
	fill(255, 255, 255);
	text('AI Asteroids', 90, 50);
	
	if (!gameOver) {
		// Draw Player
		stroke(240, 123, 65);
		strokeWeight(player.getRadius() * 2);
		point(player.getX(), player.getY());
		player.step();
		
		// Draw Asteroids
		stroke(0, 0, 0);
		for (var i = 0, l = asteroids.length; i < l; i++) {
			strokeWeight(asteroids[i].getRadius() * 2);
			point(asteroids[i].getX(), asteroids[i].getY());
			asteroids[i].step();
		}
		
		mainScene.monitorAsteroids();
		mainScene.monitorCollisions();
		
		frames++;
	} else {
		textSize(60);
		fill(255, 0, 0);
		text('Game Over', 46, 140);
		textSize(60);
		fill(37, 95, 196);
		text('Score: ', 46, 230);
		textSize(60);
		fill(255, 255, 255);
		text((frames / 30) | 0, 225, 230);
		fill(37, 95, 196);
		text('High: ', 46, 320);
		fill(255, 255, 255);
		text((highframes / 30) | 0, 192, 320);
		textSize(18);
		fill(255, 255, 255);
		text('Click to Retry!', 143, 380);
	}
};

var mouseClicked = function(){
	mainScene.retry();
};
