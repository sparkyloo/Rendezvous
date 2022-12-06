import { csrfFetch } from "../csrf";
import { setEventsList, setSelectedEvent, setGroupEventsList } from "./actions";

export function getAllEvents() {
  return async (dispatch) => {
    const response = await csrfFetch("/api/events");
    const data = await response.json();
    dispatch(setEventsList(data.Events));
  };
}

export function getSelectedEvent(eventId) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);
    const data = await response.json();
    dispatch(setSelectedEvent(data));
  };
}

export function getGroupEvents(groupId) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events/`);
    const data = await response.json();
    dispatch(setGroupEventsList(data.Events));
  };
}

export function createNewEvent(
  groupId,
  venueId,
  { name, description, type, capacity, price, startDate, endDate }
) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events/`, {
      method: "POST",
      body: JSON.stringify({
        venueId,
        name,
        description,
        type,
        capacity,
        price,
        startDate,
        endDate,
      }),
    });
    const data = await response.json();
    return data.id;
  };
}

export function updateEvent(
  venueId,
  { name, description, type, capacity, price, startDate, endDate }
) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/events/`, {
      method: "PUT",
      body: JSON.stringify({
        venueId,
        name,
        description,
        type,
        capacity,
        price,
        startDate,
        endDate,
      }),
    });
    const data = await response.json();
    return data.id;
  };
}

export function deleteEvent(eventId) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });
    dispatch(setSelectedEvent(null));
  };
}

// export function get________(){
//   return async(dispatch)=>{
//     //
//   }
// }
