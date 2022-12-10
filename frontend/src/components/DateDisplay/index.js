import "./DateDisplay.css";
import React, { useEffect, useMemo } from "react";
import Dot from "../Dot";

const dayOfTheWeek = [null, "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const getTime = (date) => {
  const time = date.toTimeString().split(" ");

  let zone = time[1];
  zone = zone.split("-")[0];

  let [hour, minute] = time[0].split(":").map((n) => parseInt(n));
  let suffix = "AM";

  if (hour >= 12) {
    suffix = "PM";

    if (hour > 12) {
      hour -= 12;
    }
  }

  if (minute < 10) {
    minute = `0${minute}`;
  } else {
    minute = minute.toString();
  }

  return `${hour}:${minute} ${suffix} ${zone}`;
};

export default function DateDisplay({ date }) {
  if (typeof date === "string" || typeof date === "number") {
    date = new Date(date);
  }

  return (
    <div>
      {dayOfTheWeek[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}{" "}
      <Dot /> {getTime(date)}
    </div>
  );
}
