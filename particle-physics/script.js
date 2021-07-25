const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const numberOfParticles = 300;
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

let titleElem = document.getElementById("title");
let titleMeasurements = titleElem.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 10,
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.dx = 2;
  }

  update() {
    if (this.y > canvas.height) {
      this.y = 0;
      this.size = Math.random() * 15 + 1;
      this.x = Math.random() * canvas.width * 1.3;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.dx;

    if (
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 3;
      this.weight *= -0.5;
    }
  }

  draw() {
    ctx.fillStyle = `hsl(${hue},100%, 30%)`;;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    particles.push(new Particle(x, y));
  }
}

init();

function animate() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  ctx.fillRect(title.x, title.y, title.width, title.height);

  hue += 0.2;

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  titleMeasurements = titleElem.getBoundingClientRect();
  title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
  };

  init();
});
