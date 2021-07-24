const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;
let speed = 1;

function draw1() {
  let x = 200 * Math.sin(angle) + canvas.width / 2;
  let y = 200 * Math.cos(angle) + canvas.height / 2;

  ctx.fillStyle = "orange";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  angle += speed * 0.000000005;
  speed += 0.00000000000000005;
}

function draw2() {
  let x = 200 * Math.cos(angle) + canvas.width / 2;
  let y = 200 * Math.sin(angle) + canvas.height / 2;

  ctx.fillStyle = "red";
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  angle += speed * 0.05;
  speed += 0.05;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw1();
  draw2();
  requestAnimationFrame(animate);
}

animate();
