/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gui = new dat.GUI();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let controlObj = {
  play: true,
  minMargin: 10,
  maxMargin: 200,
};

gui.add(controlObj, "play");
gui.add(controlObj, "minMargin").min(5).max(20);
gui.add(controlObj, "maxMargin").min(180).max(450);

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrids() {
  const points = [];
  const count = getRandomInt(50, 80);
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);

      points.push([u, v]);
    }
  }
  return points;
}

function randomGrid() {
  return createGrids().filter(() => Math.random() > 0.5);
}

let grid = [];

grid = randomGrid();

setInterval(() => {
  grid = randomGrid();
}, 10000);

function draw() {
  const margin = getRandomInt(controlObj.minMargin, controlObj.maxMargin);
  grid.forEach(([u, v]) => {
    c.beginPath();
    c.fillStyle = "black";
    c.arc(
      lerp(margin, canvas.width - margin, u),
      lerp(margin, canvas.height - margin, v),
      getRandomInt(1, 5),
      0,
      Math.PI * 2
    );
    c.fill();
  });
}

function animate() {
  if (controlObj.play) {
    draw();
  }

  c.fillStyle = "rgba(250, 250, 250, .15)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

animate();
