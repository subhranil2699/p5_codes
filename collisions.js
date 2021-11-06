let b1, b2;
let e = 1;
let button1, button2, button3, slider, button4;
let slider_m1, slider_m2, slider_u1, slider_u2;
let x, y;
let ball_u1 = 10, ball_u2 = 0, ball_m1 = 100, ball_m2 = 100;

let posx = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	button1 = createButton('e = 0 : Perfectly Inelastic Collision');
	button1.position(10, 10);
	button1.mousePressed(changeE0);

	button2 = createButton('e = 1 : Perfectly Elastic Collision');
	button2.position(10, button1.height + 20);
	button2.mousePressed(changeE1);

	slider = createSlider(0, 1, e, 0.01);
	slider.position(10, button2.height * 2 + 30);

	button3 = createButton('press');
	button3.position(slider.width + 20, button2.height * 2 + 30);
	button3.mousePressed(changeE2);
	
	// mass 1
	slider_m1 = createSlider(50, 200, ball_m1, 10);
	slider_m1.position(width - posx, 20);

	// mass 2
	slider_m2 = createSlider(50, 200, ball_m2, 10);
	slider_m2.position(width - posx, 40);

	// velocity 1
	slider_u1 = createSlider(0, 10, ball_u1, 1);
	slider_u1.position(width - posx, 60);

	// velocity 2
	slider_u2 = createSlider(0, 5, ball_u2, 1);
	slider_u2.position(width - posx, 80);

	//update button
	button4 = createButton('update');
	button4.position(width - posx, 100);
	button4.mousePressed(changeE3);

	x = 100;
	y = height / 2;
	
	ball_m1 = slider_m1.value();
	ball_m2 = slider_m2.value();

	ball_u1 = slider_u1.value();
	ball_u2 = slider_u2.value();

	// color of the balls
	c1 = color(255, 0, 0);
	c2 = color(51);

	// ball objects
	b1 = new Ball(ball_m1/5, y, ball_m1, ball_u1, c1);
	b2 = new Ball(x + 300, y, ball_m2, ball_u2, c2);
 
	// controlling frame rate
	frameRate(27);
}

function draw() {
	background(250);
	text("e = " + slider.value(), width/2, 40);

	textSize(15);
	let p = 140;
	text("m1", width - posx + p, 20);
	text("m2", width - posx + p, 40);
	text("u1", width - posx + p, 60);
	text("u2", width - posx + p, 80);

	text(slider_m1.value() + " kg", width - posx - 100, 20);
	text(slider_m2.value() + " kg", width - posx - 100, 40);
	text(slider_u1.value() + " m/s", width - posx - 100, 60);
	text(slider_u2.value() + " m/s", width - posx - 100, 80);

	b1.createParticle();
	b2.createParticle();

	b1.move();
	b2.move();
	b1.collide(b2);
  
}

function changeE0() {
	changeE3();
	e = 0;
	removeSliders();
	setup();
}
function changeE1() {
	changeE3();
	e = 1;
	removeSliders();
	setup();
}
function changeE2() {
	changeE3();
	e = slider.value();
	removeSliders();
	setup();
}

function changeE3() {
	ball_m1 = slider_m1.value()
	ball_m2 = slider_m2.value()
	ball_u1 = slider_u1.value()
	ball_u2 = slider_u2.value()
	e = slider.value();
	removeSliders();
	setup();
}

function removeSliders() {
	slider_m1.remove();
	slider_m2.remove();
	slider_u1.remove();
	slider_u2.remove();
	slider.remove();
}

class Ball {
	constructor(x, y, m, xSpeed, c) {
		this.x = x,
		this.y = y,
        this.m = m;
        this.r = m / 5;
		this.xSpeed = xSpeed;
		this.c = c;
		// this.deltaE = 0;
	}
	createParticle() {
		noStroke();
		fill(this.c);
		ellipse(this.x, this.y, this.r * 2);
		textSize(15);
		text(this.xSpeed + " m/s", this.x - this.r, this.y - this.r - 40);
		text(this.m + " kg", this.x - this.r, this.y + this.r + 40);
		textSize(32);
		// text("Energy Loss: " + this.deltaE, width/2, 20);
	}
	move() {
		this.x += this.xSpeed;
	}
	update(newSpeed) {
		this.xSpeed = newSpeed;
	}
	collide(other) {
		if (this.x + this.r >= other.x - other.r) {
			let up1 = this.xSpeed * (this.m - other.m * e) + other.m * other.xSpeed * (1 + e);
			let low1 = this.m + other.m;
			let result1 = up1 / low1;

			let up2 = this.m * this.xSpeed * (1 + e) + other.xSpeed * (other.m - this.m * e);
			let low2 = this.m + other.m;
			let result2 = up2 / low2;

			// energy loss
			// this.deltaE = ((this.m + other.m) / (2 * this.m * other.m)) * (this.xSpeed - other.xSpeed)*(this.xSpeed - other.xSpeed) * (1 - e*e);
			this.update(result1);
			other.update(result2);
		}
	}
}
