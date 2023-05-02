"use strict";
//Початкові змінні
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = 24 * 60;
const SECONDS_IN_DAY = 24 * 60 * 60;

let firstDate = document.querySelector(".start-date");
let secondDate = document.querySelector(".end-date");

let resultTable = document.querySelector(".result-table");
let rows = resultTable.rows;

let week = document.querySelector(".week");
let month = document.querySelector(".month");

let buttonCount = document.querySelector(".button-count");

let output = document.querySelector("output");

let typeDate = document.querySelector(".type_date");

// Пресети

//Тиждень

week.addEventListener("click", function () {
  let startData = new Date(firstDate.value);
  let endData = new Date(startData);
  endData.setDate(startData.getDate() + 7);
  secondDate.valueAsDate = endData;
  buttonCount.disabled = false;
});

//Місяць

month.addEventListener("click", function () {
  let startData = new Date(firstDate.value);
  let endData = new Date(startData);
  endData.setMonth(startData.getMonth() + 1);
  secondDate.valueAsDate = endData;
  buttonCount.disabled = false;
});

//Ввід дати

//Початкова дата
firstDate.addEventListener("change", function () {
  if (firstDate.value === "") {
    secondDate.disabled = true;
    buttonCount.disabled = true;
  } else {
    secondDate.disabled = false;
    secondDate.setAttribute("min", this.value);
  }
});

//Кінцева дата
secondDate.addEventListener("change", function () {
  if (secondDate.value === "") {
    buttonCount.disabled = true;
  } else {
    buttonCount.disabled = false;
  }
  firstDate.setAttribute("max", this.value);
});

//Функція розрахування

//Перевірка на вихідний день

function isWeekend(date) {
  let newDate = new Date(date);
  let weekDay = newDate.getDay();

  return weekDay === 0 || weekDay === 6;
}

//Всі дні

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

//Вихідні дні

function getWeekends(start, end, type) {
  let result = 0;
  while (start <= end) {
    let weekDay = start.getDay();
    if (isWeekend(start) === true) {
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

//Будні дні

function getWorkingDays(start, end, type) {
  let result = 0;
  while (start <= end) {
    let weekDay = start.getDay();
    if (isWeekend(start) === false) {
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

//Вивід результатів по кліку на кнопку розрахунку

buttonCount.addEventListener("click", function calculateDateDifference() {
  if (typeDate.value === "weekday") {
    output.innerHTML = getWorkingDays(
      new Date(firstDate.value),
      new Date(secondDate.value),
      document.querySelector(".number_date").value
    );
  }

  if (typeDate.value === "weekend") {
    output.innerHTML = getWeekends(
      new Date(firstDate.value),
      new Date(secondDate.value),
      document.querySelector(".number_date").value
    );
  }
  if (typeDate.value === "all") {
    output.innerHTML = durationBetweenDates(
      new Date(firstDate.value),
      new Date(secondDate.value),
      document.querySelector(".number_date").value
    );
  }

  //Таблиця

  resultTable.style.display = "table";

  let rowCount = resultTable.rows.length;
  if (rowCount > "10") {
    rows[1].remove();
  }

  let data = {
    start: new Date(firstDate.value).toDateString(),
    end: new Date(secondDate.value).toDateString(),
    result: output.value,
  };
  addRow(data.start, data.end, data.result);
  storeToLocalStorage(data);
});

//local storage

function addRow(start, end, result) {
  let item = `
    <tr class="new-row">
      <td class="startDate">${start}</td>
      <td class="endDate">${end}</td>
      <td class="result">${result}</td>
    </tr>
    `;
  resultTable.insertAdjacentHTML("beforeend", item);
}

let resultData = [];
let savedResults = JSON.parse(localStorage.getItem("resultData"));
if (savedResults) {
  for (let value of savedResults) {
    addRow(value.start, value.end, value.result);
  }
  resultTable.style.display = "table";
}

function storeToLocalStorage(data) {
  if (!savedResults) {
    savedResults = [];
  }
  if (savedResults.length >= 10) {
    savedResults.shift();
  }

  savedResults.push(data);
  localStorage.setItem("resultData", JSON.stringify(savedResults));
}
