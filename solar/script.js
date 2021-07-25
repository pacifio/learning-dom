const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let angle = 0;
let moonTrails = [];
let earthTrails = [];

function drawEarth() {
  let x = 200 * Math.sin(angle) + canvas.width / 2;
  let y = 200 * Math.cos(angle) + canvas.height / 2;

  ctx.fillStyle = "blue";
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  angle += 0.05;
  drawMoon(x, y);

  earthTrails.push(new Trail(x, y, "orange"));
}

function drawMoon(earthX, earthY) {
  let x = 300 * Math.sin(angle * 1.02) + canvas.width / 2;
  let y = 300 * Math.cos(angle * 1.02) + canvas.height / 2;

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(earthX, earthY);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();

  moonTrails.push(new Trail(x, y, "red"));
}

class Trail {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function handlemoonTrails() {
  for (let i = 0; i < moonTrails.length; i++) {
    moonTrails[i].draw();
  }
}

function handleearthTrails() {
  for (let i = 0; i < earthTrails.length; i++) {
    earthTrails[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEarth();
  handlemoonTrails();
  handleearthTrails();

  if (moonTrails.length > 500) {
    moonTrails = [];
  }

  if (earthTrails.length > 500) {
    earthTrails = [];
  }

  requestAnimationFrame(animate);
}

animate();
