/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gui = new dat.GUI();
let dots = [];
let hue = 0;

let controlObj = {
  colorize: false,
  hoverRadius: 250,
  patternRadius: 42,
  lineWidth: 0.05,
  increaseArcOnHover: true,
  onHoverArcSize: 1,
};

gui.add(controlObj, "colorize");
gui.add(controlObj, "hoverRadius").min(100).max(400);
gui.add(controlObj, "patternRadius").min(20).max(100);
gui.add(controlObj, "lineWidth").min(0.01).max(1);
gui.add(controlObj, "increaseArcOnHover");
gui.add(controlObj, "onHoverArcSize").min(0.5).max(3);

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "white";
    this.radius = 0.4;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }
}

function drawDot(x) {
  for (let i = 0; i < canvas.height - 60; i += 30) {
    dots.push(new Dot(x + 40, i + 40));
  }
}

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  dots = [];
  hue = 0;
  c.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
}

setup();

window.addEventListener("resize", function () {
  console.log(window.innerWidth);
  setup();
});

function drawGrid() {
  for (let i = 0; i < canvas.width - 60; i += 40) {
    drawDot(i);
  }
}

function handleDots() {
  for (let i = 0; i < dots.length; i++) {
    const dot1 = dots[i];
    dot1.draw();
    if (mouse.x && mouse.y) {
      const dist = Math.hypot(dot1.x - mouse.x, dot1.y - mouse.y);
      if (dist < controlObj.hoverRadius) {
        let color;
        if (controlObj.colorize) {
          color = `hsla(${hue},100%, 50%, .8)`;
          dot1.color = color;
        } else {
          color = "white";
        }

        if (controlObj.increaseArcOnHover) {
          dot1.radius = controlObj.onHoverArcSize;
        }

        for (let j = i; j < dots.length; j++) {
          const dot2 = dots[j];
          const dotD = Math.hypot(dot1.x - dot2.x, dot1.y - dot2.y);
          if (dotD < controlObj.patternRadius) {
            c.beginPath();
            c.strokeStyle = color;
            c.lineWidth = controlObj.lineWidth;
            c.moveTo(dot1.x, dot1.y);
            c.lineTo(dot2.x, dot2.y);
            c.stroke();
            c.closePath();
          }
        }
      } else {
        dot1.color = "white";
        dot1.radius = 0.4;
      }
    }
  }
}

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// drawGrid();

function animate() {
  c.fillStyle = "rgba(0, 0, 0, .1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  handleDots();
  hue += 0.8;

  requestAnimationFrame(animate);
}

animate();
