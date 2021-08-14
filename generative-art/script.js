/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#FFF5DE";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
ctx.globalCompositeOperation = "destination-over";

let drawing = false;

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 20;
    this.size = Math.random() * 1 + 2;
    this.vs = Math.random() * 0.2 + 0.5;

    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.3;

    this.angleY = Math.random() * 6.2;
    this.vaY = Math.random() * 0.6 - 0.3;

    this.angle = 0;
    this.va = Math.random() * 0.02 + 0.05;
    this.lightness = 10;
  }

  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleX += this.vaY;
    this.angle += this.va;

    if (this.lightness < 70) this.lightness += 0.55;

    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#3c5186";
      let double = this.size * 2;
      ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);

      ctx.lineWidth = 0.2;
      ctx.strokeStyle = "white";
      let triple = this.size * 3;
      ctx.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);

      ctx.restore();
      requestAnimationFrame(this.update.bind(this));
    } else {
    }
  }
}

window.addEventListener("mousemove", function (e) {
  if (drawing) {
    for (let i = 0; i < 2; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});

window.addEventListener("mousedown", function (e) {
  drawing = true;
  for (let i = 0; i < 20; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});

window.addEventListener("mouseup", function () {
  drawing = false;
});
