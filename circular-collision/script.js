const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const RADIUS = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color ?? "red";
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const center = new Circle(canvas.width / 2, canvas.height / 2, "blue");
const circle = new Circle(0, 0, "green");

canvas.addEventListener("mousemove", function (event) {
  circle.update(event.x, event.y);
});

function detectCollision() {
  const dx = circle.x - center.x;
  const dy = circle.y - center.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const sumOfRad = RADIUS * 2;

  if (distance < sumOfRad) {
    circle.color = "red";
    center.color = "red";
  } else {
    circle.color = "green";
    center.color = "blue";
  }
}

function drawLine() {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "white";

  ctx.beginPath();
  ctx.moveTo(circle.x, circle.y);
  ctx.lineTo(center.x, center.y);

  ctx.moveTo(center.x, circle.y);
  ctx.lineTo(center.x, center.y);

  ctx.moveTo(center.x, circle.y);
  ctx.lineTo(circle.x, circle.y);

  ctx.closePath();
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  detectCollision();

  center.draw();
  circle.draw();

  drawLine();
  detectCollision();

  requestAnimationFrame(animate);
}

animate();
