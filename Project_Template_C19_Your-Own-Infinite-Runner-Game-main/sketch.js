let circles = [];
let score = 0;
let timeLeft = 30; // Adjust the game duration as needed

function setup() {
  createCanvas(800, 400);
  noStroke();
  ellipseMode(CENTER);
}

function draw() {
  background(220);

  if (timeLeft > 0) {
    // Draw and move the circles
    for (let i = circles.length - 1; i >= 0; i--) {
      let circle = circles[i];
      circle.display();
      circle.move();

      if (circle.isCaught(mouseX, mouseY)) {
        circles.splice(i, 1);
        score++;
      }

      if (circle.isMissed()) {
        circles.splice(i, 1);
      }
    }

    // Display score and time left
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 20, 30);
    text(`Time Left: ${timeLeft}`, width - 150, 30);

    timeLeft -= 1 / frameRate();
  } else {
    // Game over
    textSize(48);
    text('Game Over', width / 2 - 120, height / 2);
    textSize(32);
    text(`Your Score: ${score}`, width / 2 - 80, height / 2 + 40);
    noLoop();
  }
}

function mousePressed() {
  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].isCaught(mouseX, mouseY)) {
      circles.splice(i, 1);
      score++;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    setupGame();
  }
}

function setupGame() {
  circles = [];
  score = 0;
  timeLeft = 30;
  loop();

  // Create new circles
  for (let i = 0; i < 10; i++) {
    circles.push(new Circle());
  }
}

class Circle {
  constructor() {
    this.radius = 20;
    this.x = random(this.radius, width - this.radius);
    this.y = random(this.radius, height / 2);
    this.speed = random(2, 5);
  }

  move() {
    this.y += this.speed;
  }

  isCaught(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.radius;
  }

  isMissed() {
    return this.y > height + this.radius;
  }

  display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

setupGame(); // Start the game when the page loads
