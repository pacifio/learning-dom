const buttons = document.querySelectorAll("button");
const turbulence = document.querySelector("feTurbulence");

const DEFAULT = 0.00001;

let verticalFrequency, horizontalFrequency;

function setDefault() {
  verticalFrequency = DEFAULT;
  horizontalFrequency = DEFAULT;
}

function setAttribute() {
  turbulence.setAttribute(
    "baseFrequency",
    `${verticalFrequency} ${horizontalFrequency}`
  );
}

setDefault();
setAttribute();

const steps = 30;
const interval = 10;

buttons.forEach(function (button) {
  button.addEventListener("mouseover", function () {
    setDefault();
    for (i = 0; i < steps; i++) {
      setTimeout(function () {
        verticalFrequency += 0.002;
        horizontalFrequency += 0.0005;
        setAttribute();
      }, i * interval);
    }

    setTimeout(function () {
      setDefault();
      setAttribute();
    }, steps * interval);
  });
});
