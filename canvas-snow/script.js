const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const drops = [];

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setup();

window.addEventListener("resize", function () {
  setup();
});

setInterval(function () {
  for (let i = 0; i < 20; i++) {
    drops.push(new RainDrop());
  }
}, 500);

class RainDrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speedY = Math.random() * 4 + 1;
    this.size = Math.random() * 10 + 2;
  }

  update() {
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleDrops() {
  for (let i = 0; i < drops.length; i++) {
    drops[i].update();
    drops[i].draw();

    if (drops[i].y >= canvas.height) {
      drops.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleDrops();
  requestAnimationFrame(animate);
}

animate();
