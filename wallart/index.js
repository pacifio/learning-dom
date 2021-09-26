/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gui = new dat.GUI();
c.globalCompositeOperation = "destination-out";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let controlObj = {
  colorize: true,
  lineWidth: 6,
  filterRadius: 0.5,
  minRandom: 4,
  maxRandom: 12,
};

gui.add(controlObj, "colorize");
gui.add(controlObj, "lineWidth").min(4).max(10);
gui.add(controlObj, "filterRadius").min(0.1).max(0.9);
gui.add(controlObj, "minRandom").min(1).max(5);
gui.add(controlObj, "maxRandom").min(6).max(100);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function randomColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}

const gridPoints = () => {
  const points = [];
  const count = getRandomInt(
    Math.floor(controlObj.minRandom),
    Math.floor(controlObj.maxRandom)
  );
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);
      points.push({
        u,
        v,
      });
    }
  }
  return points;
};

function draw() {
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  const grid = gridPoints().filter(
    () => Math.random() > controlObj.filterRadius
  );
  const margin = 40;

  grid.forEach(({ u, v }) => {
    const x = lerp(margin, canvas.width - margin, u);
    const y = lerp(margin, canvas.height - margin, v);

    const r = grid[Math.floor(Math.random() * grid.length)];
    const m = lerp(margin, canvas.width - margin, r.u);
    const n = lerp(margin, canvas.height - margin, r.v);

    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(m, n);
    c.lineTo(m, canvas.height - margin);
    c.lineTo(x, canvas.height - margin);
    c.lineTo(x, y);

    c.fillStyle = controlObj.colorize ? randomColor() : "#121212";
    c.lineWidth = controlObj.lineWidth;
    c.strokeStyle = "white";
    c.stroke();
    c.fill();
  });
}

draw();

function download() {
  const link = document.createElement("a");
  link.download = "download.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

canvas.addEventListener("click", function () {
  c.clearRect(0, 0, canvas.width, canvas.height);
  draw();
});

window.addEventListener("keypress", function (e) {
  if (e.key.toLowerCase() === "s") {
    download();
  }
});
