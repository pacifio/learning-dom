document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  for (let i = 0; i < 9; i++) {
    let child = document.createElement("div");
    child.setAttribute("id", i + 1);
    child.classList.add("square");
    grid.appendChild(child);
  }

  const square = document.querySelectorAll(".square");
  const timeLeft = document.getElementById("time-left");
  let score = document.getElementById("score");

  let result = 0;
  let hitPosition;
  let currentTime = timeLeft.textContent;

  function randomSquare() {
    square.forEach((className) => {
      className.classList.remove("mole");
    });

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");
    hitPosition = randomPosition.id;
  }

  square.forEach((id) => {
    id.addEventListener("mouseup", () => {
      if (id.id === hitPosition) {
        result = result + 1;
        score.textContent = result;
      }
    });
  });

  function moveMole() {
    setInterval(randomSquare, 1000);
  }

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(timerId);
      alert("GAME OVER ! Your final score is " + result);
    }
  }

  let timerId = setInterval(countDown, 1000);

  moveMole();
});
