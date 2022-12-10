import "./Location.css";
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Location({ type, item, linkTo }) {
  let city = "";
  let state = "";
  let location = null;

  if (type === "group") {
    city = item.city;
    state = item.state;
  } else if (item.Venue) {
    city = item.Venue.city;
    state = item.Venue.state;
  }

  if (type === "event") {
    if (item.type === "Online") {
      location = <div className="item-location">Online (Zoom)</div>;
    } else if (!city && !state) {
      location = <div className="item-location">TBD</div>;
    } else {
      location = (
        <div className="item-location">
          {city.toUpperCase()}, {state.toUpperCase()}
        </div>
      );
    }
  } else {
    location = (
      <div className="item-location">
        {city.toUpperCase()}, {state.toUpperCase()}
      </div>
    );
  }

  return typeof linkTo === "undefined" ? (
    location
  ) : (
    <Link to={linkTo}>{location}</Link>
  );
}
