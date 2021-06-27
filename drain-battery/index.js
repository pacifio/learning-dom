document.addEventListener("DOMContentLoaded", function () {
  const appBody = document.querySelector(".app");
  let battery = 100;

  (function () {
    for (let i = 0; i < 5; i++) {
      let child = document.createElement("div");
      child.setAttribute("data-id", i);
      child.classList.add("grid");
      appBody.appendChild(child);
    }
  })();

  appBody.addEventListener("click", function () {
    appBody.classList.add("anim-shake");
    setTimeout(() => {
      appBody.classList.remove("anim-shake");
    }, 100);

    let children = document.querySelectorAll(".grid");
    if (children.length > 0) {
      appBody.removeChild(children[0]);
      battery -= 20;
    }

    document.querySelector('h3').textContent = `${battery}%`;
  });
});
