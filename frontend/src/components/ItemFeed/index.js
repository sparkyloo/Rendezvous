import "./ItemFeed.css";
import React, { useEffect, useMemo } from "react";

export default function ItemFeed({ type, items }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id} className={`${type}-item`}>
            <img className="item-image" src={item.previewImage} />
            <div className="item-description">
              <div className="item-title">{item.name}</div>
              <div className="item-location">
                {item.city.toUpperCase()}, {item.state.toUpperCase()}
              </div>
              <div className="item-summary">
                {item.about || item.description}
              </div>
              <div className="item-details">
                <span className="item-members">
                  {item.numMembers} members
                </span>
                <Dot />
                <span className="item-privacy">
                  {item.private ? "Private" : "Public"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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

function DateDisplay({ date }) {
  return (
    <div>
      {dayOfTheWeek[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}{" "}
      <Dot /> {getTime(date)}
    </div>
  );
}

function Dot() {
  return <span>·</span>;
}
