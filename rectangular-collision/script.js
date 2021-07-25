const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 100;
const HEIGHT = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawRec() {}

class Box {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = WIDTH;
    this.height = HEIGHT;
    this.color = color ?? "orange";
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fill();
  }
}

const centerBox = new Box(
  canvas.width / 2 - WIDTH / 2,
  canvas.height / 2 - HEIGHT / 2,
  "orange"
);

const box = new Box(0, 0, "blue");

canvas.addEventListener("mousemove", function (event) {
  box.update(event.x - WIDTH / 2, event.y - HEIGHT / 2);
});

function drawLine() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(box.x + WIDTH / 2, box.y + HEIGHT / 2);
  ctx.lineTo(centerBox.x + WIDTH / 2, centerBox.y + HEIGHT / 2);
  ctx.closePath();
  ctx.stroke();
}

function detectCollision() {
  if (
    box.x < centerBox.x + centerBox.width &&
    box.x + box.width > centerBox.x &&
    box.y < centerBox.y + centerBox.height &&
    box.y + box.height > centerBox.y
  ) {
    box.color = "red";
    centerBox.color = "red";
  } else {
    box.color = "blue";
    centerBox.color = "orange";
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  centerBox.draw();
  box.draw();

  drawLine();
  detectCollision();

  requestAnimationFrame(animate);
}

animate();
