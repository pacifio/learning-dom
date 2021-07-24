const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setup();

window.addEventListener("resize", function () {
  setup();
});

ctx.globalCompositeOperation = "destination-over";

let number = 0;
let scale = 2;

function draw() {
  let angle = number * 0.05;
  let radius = (scale * Math.sqrt(number)) / 5;
  let positionX = radius * Math.sin(angle) + canvas.width / 2;
  let positionY = radius * Math.cos(angle) + canvas.height / 2;

  ctx.fillStyle = "grey";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  number += 2;
}

function animate() {
  draw();

  if (number > 1000) {
    return;
  }

  requestAnimationFrame(animate);
}

animate();
