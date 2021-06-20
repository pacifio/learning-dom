document.addEventListener("DOMContentLoaded", () => {
  var body = document.querySelector(".app");
  var box = document.createElement("div");
  box.classList.add("box");
  box.style.backgroundColor = "rgb(29, 185, 84)";
  box.style.position = "absolute";

  const result = document.getElementById("score");

  box.addEventListener("click", () => {
    times = times + 1;
    result.textContent = times;

    box.classList.add("anim-shake");
    setTimeout(() => {
      box.classList.remove("anim-shake");
    }, 100);

    if (times >= 10) {
      win = true;
      alert("You won");

      resetGame();
    }
  });

  function resetGame() {
    win = false;
    times = 0;
    level = 1500;

    result.textContent = times;
  }

  body.appendChild(box);

  let win = false;
  let times = 0;
  let timer = null;
  let level = 1500;
  timer = setInterval(move, level);
  setInterval(makeHard, 1000 * 30);

  function move() {
    box.style.left = `${Math.abs(Math.random() * window.innerWidth - 100)}px`;
    box.style.top = `${Math.abs(Math.random() * window.innerHeight - 100)}px`;
    box.style.backgroundColor = `rgb(${Math.abs(
      Math.random() * 255
    )}, ${Math.abs(Math.random() * 255)}, ${Math.abs(Math.random() * 255)})`;

    if (win) {
      clearInterval(timer);
    }
  }

  function makeHard() {
    if (level > 300) {
      level = level - 100;
      timer = setInterval(move, level);
    }
  }
});
