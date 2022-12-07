import "./EventsFeed.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events/thunks";
import ItemFeed from "../ItemFeed";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => {
    return state.events.allEvents;
  });

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return <ItemFeed type="event" items={allEvents} />;
}
