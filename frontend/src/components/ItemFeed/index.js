import "./ItemFeed.css";
import React, { useEffect } from "react";

export default function ItemFeed({ type, items, className }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <div>
              <img src={item.previewImage} />
            </div>
            {type === "event" && <div>{item.startDate}</div>}
            <div>{item.name}</div>
            <div>{item.about || item.description}</div>
            {type === "event" && <div>{item.numAttending} attendees</div>}
            {type === "group" && (
              <div>
                <div>{item.numMembers} members</div>
                <div>{item.private ? "Private" : "Public"}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
