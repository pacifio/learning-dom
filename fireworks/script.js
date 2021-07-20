const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particles = [];
let hue = 0;

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setup();

window.addEventListener("scroll", function () {
  setup();
});

setInterval(function () {
  shoot();
}, 2500);

class Particle {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.size = Math.random() * 12 + 1;
    this.speedX = Math.random() * 12 - 6;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue},100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function shoot() {
  for (let i = 0; i < 180; i++) {
    particles.push(new Particle());
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 15) {
        particles[i].y -= 4;
      } else {
        particles[j].y += 0.06;
      }
    }

    if (particles[i].size <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += .5;
  requestAnimationFrame(animate);
}

animate();
