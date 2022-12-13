import "./ItemFeed.css";
import React from "react";
import { Link } from "react-router-dom";
import Location from "../Location";
import DateDisplay from "../DateDisplay";
import Dot from "../Dot";

export default function ItemFeed({ type, items, showParentLink, onAttend }) {
  return (
    <div>
      {items.map((item) => {
        let detailsDestination = "";
        let parentDestination = "";

        if (type === "group") {
          detailsDestination = `/group/${item.id}`;
        } else {
          detailsDestination = `/event/${item.id}`;
        }

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

          parentDestination = `/group/${item.groupId}`;
        } else {
          location = (
            <div className="item-location">
              {city.toUpperCase()}, {state.toUpperCase()}
            </div>
          );
        }

        return (
          <div key={item.id} className={`item-feed ${type}-item`}>
            <Link to={detailsDestination}>
              <img
                className="item-image"
                src={item.previewImage || "https://plchldr.co/i/300x200"}
              />
            </Link>
            <div className="item-description">
              <Link to={detailsDestination}>
                <div className="item-title">{item.name}</div>
              </Link>
              <Location type={type} item={item} linkTo={detailsDestination} />
              <div className="item-summary">
                {showParentLink && parentDestination && (
                  <div>
                    By the <Link to={parentDestination}>{item.Group.name}</Link>{" "}
                    group
                  </div>
                )}
                {type === "event" && <DateDisplay date={item.startDate} />}
                {item.about || item.description}
              </div>
              <div className="item-details">
                {type === "group" ? (
                  <>
                    <span className="item-members">
                      {item.numMembers} members
                    </span>{" "}
                    <Dot />{" "}
                    <span className="item-privacy">
                      {item.private ? "Private" : "Public"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="item-members">
                      {item.numAttending} attendees
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
