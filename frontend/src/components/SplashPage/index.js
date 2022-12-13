import "./SplashPage.css";
import React, { useState } from "react";
import GroupsFeed from "../GroupsFeed";
import EventsFeed from "../EventsFeed";

export default function SplashPage() {
  const [activeList, setActiveList] = useState("groups");

  const switchActiveList = () => {
    if (activeList === "groups") {
      setActiveList("events");
    } else {
      setActiveList("groups");
    }
  };

  return (
    <div className="feed-page splash-page">
      <div className="list-options">
        <button
          className={activeList === "groups" ? "active-list" : "inactive-list"}
          onClick={switchActiveList}
        >
          All Groups
        </button>
        <button
          className={activeList === "events" ? "active-list" : "inactive-list"}
          onClick={switchActiveList}
        >
          All Events
        </button>
      </div>
      {activeList === "groups" ? <GroupsFeed /> : <EventsFeed />}
    </div>
  );
}
