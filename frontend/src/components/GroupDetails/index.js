import "./GroupDetails.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSelectedGroup, getMyGroups, deleteGroup } from "../../store/groups";
import { getGroupEvents } from "../../store/events";
import Dot from "../Dot";
import ItemFeed from "../ItemFeed";
import Location from "../Location";
import { useErrorHandling } from "../../error-handling";

export default function GroupDetails() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { redirectWhenError } = useErrorHandling();

  const {
    user,
    group,
    events = [],
    groupImageUrl,
    organizerName = "",
    hasMembership = false,
    isGroupAdmin = false,
  } = useSelector(
    ({
      session: { user },
      groups: { selected, myGroups },
      events: { groupEvents },
    }) => {
      if (!selected) {
        return {};
      }

      const { organizerId, GroupImages = [], Organizer } = selected;
      let organizerName = "";
      let hasMembership = false;
      let isGroupAdmin = false;

      if (Organizer) {
        const { firstName, lastName } = Organizer;

        organizerName = [firstName, lastName].join(" ");
      }

      if (myGroups.length) {
        const alreadyJoined = !!myGroups.find(
          (group) => group.id === selected.id
        );

        if (alreadyJoined) {
          hasMembership = true;
        }
      }

      if (user && user.id === organizerId) {
        isGroupAdmin = true;
      }

      return {
        user,
        group: selected,
        events: groupEvents,
        groupImageUrl: GroupImages[0] || "https://plchldr.co/i/300x200",
        organizerName,
        hasMembership,
        isGroupAdmin,
      };
    }
  );

  useEffect(() => {
    dispatch(getSelectedGroup(groupId)).catch(redirectWhenError);
    dispatch(getGroupEvents(groupId)).catch(redirectWhenError);
  }, [groupId]);

  useEffect(() => {
    if (user) {
      dispatch(getMyGroups()).catch(redirectWhenError);
    }
  }, [user]);

  if (!group) {
    return null;
  }

  const description = group.about || group.description;

  return (
    <div className="detail-page group-page">
      <div className="masthead">
        {groupImageUrl && <img className="group-image" src={groupImageUrl} />}
        <div className="group-info">
          <h1>{group.name}</h1>
          <h2 className="subtitle">
            <Location type="group" item={group} />
          </h2>
          <ul>
            <li>
              <span>{group.numMembers} members</span> <Dot />{" "}
              <span>
                {group.private ? "Private" : "Public"}{" "}
                {group.type.toLowerCase()} group
              </span>
            </li>
            <li>
              <span>Organized by</span>{" "}
              <span className="organizer">{organizerName}</span>
            </li>
          </ul>
          <div className="group-actions">
            {/* {!hasMembership && <SpecialButton label="Join" />} */}
            {isGroupAdmin && (
              <>
                <button
                  onClick={() => history.push(`/group/${groupId}/new-event`)}
                >
                  Create Event
                </button>
                <button onClick={() => history.push(`/group/${groupId}/edit`)}>
                  Edit Group
                </button>
                <button
                  onClick={() =>
                    dispatch(deleteGroup(groupId))
                      .then(() => {
                        history.push("/my-groups");
                      })
                      .catch(redirectWhenError)
                  }
                >
                  Delete Group
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {!!description && (
        <>
          <h3>What we're about</h3>
          <p className="group-description">{description}</p>
        </>
      )}
      <h3>Upcoming events {events.length > 0 && `(${events.length})`}</h3>
      {events.length === 0 ? (
        <p className="no-events-message">Nothing on the schedule yet.</p>
      ) : (
        <ItemFeed type="event" items={events} />
      )}
    </div>
  );
}
