let allDays = true;
let weekdays = true;
let weekends = true;

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = 24 * 60;
const SECONDS_IN_DAY = 24 * 60 * 60;

let buttonCount = document.querySelector(".button-count");

buttonCount.onclick = function () {
  if (weekdays) {
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
    console.log(
      getWorkingDays(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "days"
      )
    );
    console.log(
      getWorkingDays(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "minutes"
      )
    );
  }

  if (weekends) {
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
    console.log(
      getWeekends(new Date("26 Jul 2023"), new Date("30 Jul 2023"), "days")
    );
    console.log(
      getWeekends(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "minutes"
      )
    );
  }
  if (allDays) {
    function durationBetweenDates(
      start = "2023-06-26",
      end = "2023-06-30",
      type = "days"
    ) {
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

    console.log(
      durationBetweenDates(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "days"
      )
    );
    console.log(
      durationBetweenDates(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "hours"
      )
    );
    console.log(
      durationBetweenDates(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "minutes"
      )
    );
    console.log(
      durationBetweenDates(
        new Date(document.querySelector(".start-date").value),
        new Date(document.querySelector(".end-date").value),
        "seconds"
      )
    );
  }
};
