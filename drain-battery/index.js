document.addEventListener("DOMContentLoaded", function () {
  const appBody = document.querySelector(".app");

  (function () {
    for (let i = 0; i < 5; i++) {
      let child = document.createElement("div");
      child.setAttribute("data-id", i);
      child.classList.add("grid");
      appBody.appendChild(child);
    }
  })();
});
