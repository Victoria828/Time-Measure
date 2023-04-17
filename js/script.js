"use strict";
//Початкові змінні
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = 24 * 60;
const SECONDS_IN_DAY = 24 * 60 * 60;

// Пресети
let week = document.querySelector(".week");

week.onclick = function () {
  let startData = new Date(document.querySelector(".start-date").value);
  let endData = new Date(startData);
  endData.setDate(startData.getDate() + 7);
  document.querySelector(".end-date").valueAsDate = endData;
};

let month = document.querySelector(".month");

month.onclick = function () {
  let startData = new Date(document.querySelector(".start-date").value);
  let endData = new Date(startData);
  endData.setMonth(startData.getMonth() + 1);
  document.querySelector(".end-date").valueAsDate = endData;
};

//Ввід дати
let firstDate = document.querySelector(".start-date");

firstDate.onchange = function () {
  if (firstDate.value === "") {
    document.querySelector(".end-date").disabled = true;
  } else {
    document.querySelector(".end-date").disabled = false;
  }
};

//Функція розрахування
let buttonCount = document.querySelector(".button-count");

buttonCount.onclick = function calculateDateDifference() {
  if (document.querySelector(".type_date").value === "weekday") {
    function getWorkingDays(start, end, type) {
      let result = 0;
      while (start <= end) {
        let weekDay = start.getDay();
        if (weekDay != 0 && weekDay != 6) {
          result++;
        }
        start.setDate(start.getDate() + 1);
      }
      switch (type) {
        case "hours":
          result = result * HOURS_IN_DAY;
          break;
        case "minutes":
          result = result * MINUTES_IN_DAY;
          break;
        case "seconds":
          result = result * SECONDS_IN_DAY;
          break;
      }
      return `${result} ${type}`;
    }

    document.querySelector("output").innerHTML = getWorkingDays(
      new Date(document.querySelector(".start-date").value),
      new Date(document.querySelector(".end-date").value),
      document.querySelector(".number_date").value
    );
  }

  if (document.querySelector(".type_date").value === "weekend") {
    function getWeekends(start, end, type) {
      let result = 0;
      while (start <= end) {
        let weekDay = start.getDay();
        if (weekDay === 0 || weekDay === 6) {
          result++;
        }
        start.setDate(start.getDate() + 1);
      }
      switch (type) {
        case "hours":
          result = result * HOURS_IN_DAY;
          break;
        case "minutes":
          result = result * MINUTES_IN_DAY;
          break;
        case "seconds":
          result = result * SECONDS_IN_DAY;
          break;
      }
      return `${result} ${type}`;
    }
    document.querySelector("output").innerHTML = getWeekends(
      new Date(document.querySelector(".start-date").value),
      new Date(document.querySelector(".end-date").value),
      document.querySelector(".number_date").value
    );
  }
  if (document.querySelector(".type_date").value === "all") {
    function durationBetweenDates(start, end, type) {
      let x = new Date(start);
      let y = new Date(end);

      let diff = y.getTime() - x.getTime();
      let result;

      switch (type) {
        case "days":
          result = diff / DAY_IN_MILLISECONDS + 1;
          break;
        case "hours":
          result = diff / HOUR_IN_MILLISECONDS + HOURS_IN_DAY;
          break;
        case "minutes":
          result = diff / MINUTE_IN_MILLISECONDS + MINUTES_IN_DAY;
          break;
        case "seconds":
          result = diff / SECOND_IN_MILLISECONDS + SECONDS_IN_DAY;
          break;
      }

      return `${result} ${type}`;
    }

    document.querySelector("output").innerHTML = durationBetweenDates(
      new Date(document.querySelector(".start-date").value),
      new Date(document.querySelector(".end-date").value),
      document.querySelector(".number_date").value
    );
  }

  let startDate = new Date(document.querySelector(".start-date").value);
  let endDate = new Date(document.querySelector(".end-date").value);
  const resultTable = document.querySelector(".result-table");
  const newRow = resultTable.insertRow();
  const startDateCell = newRow.insertCell();
  startDateCell.textContent = startDate.toDateString();
  const endDateCell = newRow.insertCell();
  endDateCell.textContent = endDate.toDateString();
  const dateDifferenceCell = newRow.insertCell();
  dateDifferenceCell.textContent = document.querySelector("output").value;
};
