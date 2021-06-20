document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".screen");
  const textBody = document.querySelector(".gradient-text");
  const notificationsBody = document.querySelector(".notifications");
  const batteryParent = document.querySelector(".battery");
  const dateBody = document.getElementById("date");
  const hourBody = document.getElementById("hour");
  const minuteBody = document.getElementById("minutes");
  const batteryBody = document.getElementById("bat");

  function getFormattedDay(date) {
    switch (date) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Fri";
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

  function setTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours.toString().length === 1) {
      hours = "0" + hours;
    }

    if (minutes.toString().length === 1) {
      minutes = "0" + minutes;
    }

    hourBody.textContent = hours;
    minuteBody.textContent = minutes;
    dateBody.textContent = `${getFormattedDay(
      now.getDay()
    )} , ${now.getDate()} ${getFormattedMonth(now.getMonth())}`;
  }

  setTime();

  setInterval(() => {
    setTime();
  }, 1000);

  window.navigator.getBattery().then((bat) => {
    batteryBody.textContent = `${bat.level * 100}%`;

    bat.addEventListener("levelchange", function () {
      batteryBody.textContent = `${bat.level * 100}%`;
    });
  });

  let rotated = false;
  screen.addEventListener("click", function () {
    console.log("call");
    rotated = !rotated;

    if (rotated) {
      screen.style.transform = "rotate(90deg)";
      textBody.style.transform = "rotate(-90deg)";

      notificationsBody.style.display = "none";
      batteryParent.style.display = "none";
    } else {
      screen.style.transform = "rotate(0deg)";
      textBody.style.transform = "rotate(0deg)";

      notificationsBody.style.display = "flex";
      batteryParent.style.display = "flex";
    }
  });
});
