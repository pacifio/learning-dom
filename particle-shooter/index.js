/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
const scoreEl = document.getElementById("score");

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const FRICTION = 0.98;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

const player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");

let projectiles = [];
let enemies = [];
let particles = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;

    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

window.addEventListener("click", function (e) {
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle) * 4,
    y: Math.sin(angle) * 4,
  };
  const projectile = new Projectile(
    canvas.width / 2,
    canvas.height / 2,
    5,
    "white",
    velocity
  );

  projectiles.push(projectile);
});

let animateId;
let score = 0;
function animate() {
  animateId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, .1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();

  particles.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });

  projectiles.forEach((projectile, i) => {
    projectile.update();
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(i, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, i) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animateId);
      if (confirm(`Score : ${score} , Restart ?`)) {
        particles = [];
        enemies = [];
        projectiles = [];

        c.clearRect(0, 0, canvas.width, canvas.height);
        score = 0;
        scoreEl.innerText = score;
        animate();
      }
    }

    projectiles.forEach((projectile, pI) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // when projectiles touch enemy
      if (dist - enemy.radius - projectile.radius < 1) {
        // create explosions
        for (let i = 0; i < 8; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * (3 - 1) + 1,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              }
            )
          );
        }

        if (enemy.radius - 10 > 5) {
          score += 100;
          scoreEl.innerText = score;
          // enemy.radius -= 10;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(pI, 1);
          }, 0);
        } else {
          score += 250;
          scoreEl.innerText = score;
          setTimeout(() => {
            enemies.splice(i, 1);
            projectiles.splice(pI, 1);
          }, 0);
        }
      }
    });
  });
}

animate();
spawnEnemies();
