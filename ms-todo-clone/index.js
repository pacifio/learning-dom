let db = [];

function getFormattedDay(date) {
  switch (date) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Friday";
  }
}

function getFormattedMonth(month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "January";
  }
}

function today() {
  let now = new Date();
  return `${getFormattedDay(
    now.getDay()
  )} , ${now.getDate()} ${getFormattedMonth(now.getMonth())}`;
}

function setDate() {
  document.getElementById("date").textContent = today();
}

function addTodo(value) {
  db.push(value);

  let index = db.indexOf(value);
  let element = document.createElement("div");
  element.classList.add("todo");
  element.setAttribute("data-id", index.toString());

  let h4Elem = document.createElement("h4");
  h4Elem.innerText = value;

  let spanElem = document.createElement("span");
  spanElem.innerText = today();

  element.appendChild(h4Elem);
  element.appendChild(spanElem);

  element.addEventListener("click", function () {
    document.querySelector(".todos").removeChild(element);
    db.splice(index, 1);
    persist();
  });

  document.querySelector(".todos").appendChild(element);
  persist();
}

function persist() {
  window.localStorage.setItem("db", db);
}

document.addEventListener("DOMContentLoaded", function () {
  setDate();

  let saved = window.localStorage.getItem("db");
  if (
    saved !== null &&
    saved !== undefined &&
    saved.length !== 0 &&
    saved !== ""
  ) {
    let items = saved.split(",");
    items.forEach((value) => {
      addTodo(value);
    });
  }

  document.querySelector(".input").addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
      let input = document.querySelector("input");
      addTodo(input.value);
      input.value = "";
    }
  });
});
