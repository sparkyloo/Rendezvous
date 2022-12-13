import "./EventDetails.css";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deleteEvent,
  getGroupEvents,
  getSelectedEvent,
} from "../../store/events";
import ItemFeed from "../ItemFeed";
import Location from "../Location";
import { useErrorHandling } from "../../error-handling";
import { getSelectedGroup } from "../../store/groups/thunks";

export default function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { redirectWhenError } = useErrorHandling();

  const event = useSelector((state) => {
    return state.events.selected;
  });

  const isGroupAdmin = useSelector((state) => {
    const {
      session: { user },
      groups,
    } = state;

    if (!user) {
      return false;
    }

    const { selected = {} } = groups;

    if (user.id === selected.organizerId) {
      return true;
    }

    return false;
  });

  const otherEvents = useSelector((state) => {
    return state.events.groupEvents.filter((event) => {
      return `${event.id}` !== eventId;
    });
  });

  const eventImageUrl = useMemo(() => {
    const { EventImages = [] } = event || {};

    return EventImages[0] || "https://plchldr.co/i/300x200";
  }, [event]);

  useEffect(() => {
    dispatch(getSelectedEvent(eventId)).catch(redirectWhenError);
  }, [eventId]);

  useEffect(() => {
    if (event) {
      dispatch(getGroupEvents(event.groupId)).catch(redirectWhenError);
    }
  }, [event]);

  useEffect(() => {
    if (event) {
      dispatch(getSelectedGroup(event.groupId)).catch(redirectWhenError);
    }
  }, [eventId]);

  if (!event) {
    return null;
  }

  const description = event.about || event.description;

  return (
    <div className="detail-page event-page">
      <div className="masthead">
        {eventImageUrl && <img className="event-image" src={eventImageUrl} />}
        <div className="event-info">
          <h1>{event.name}</h1>
          <h2 className="subtitle">
            <Location type="event" item={event} />
          </h2>
          <ul>
            <li>
              By the{" "}
              <Link to={`/group/${event.groupId}`}>{event.Group.name}</Link>{" "}
              group
            </li>
            <li>
              <span>{event.numAttending}</span>{" "}
              {typeof event.capacity === "number" && (
                <>
                  <span>of {event.capacity}</span>{" "}
                </>
              )}
              <span>attendees</span>
            </li>
          </ul>
          <div className="event-actions">
            {isGroupAdmin && (
              <button
                onClick={() =>
                  dispatch(deleteEvent(event.id))
                    .then(() => {
                      history.push(`/group/${event.groupId}`);
                    })
                    .catch(redirectWhenError)
                }
              >
                Delete Event
              </button>
            )}
          </div>
        </div>
      </div>
      {!!description && (
        <>
          <h3>What we're about</h3>
          <p className="event-description">{description}</p>
        </>
      )}
      <h3>
        Other events {otherEvents.length > 0 && `(${otherEvents.length})`}
      </h3>
      {otherEvents.length === 0 ? (
        <p className="no-events-message">Nothing on the schedule yet.</p>
      ) : (
        <ItemFeed type="event" items={otherEvents} />
      )}
    </div>
  );
}
