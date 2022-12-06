export const SET_EVENTS_LIST = "events/setList";

export function setEventsList(list) {
  return {
    type: SET_EVENTS_LIST,
    payload: list,
  };
}

export const SET_SELECTED_EVENT = "events/setSelected";

export function setSelectedEvent(event) {
  return {
    type: SET_SELECTED_EVENT,
    payload: event,
  };
}

export const SET_GROUP_EVENTS_LIST = "events/setGroupList";

export function setGroupEventsList(list) {
  return {
    type: SET_GROUP_EVENTS_LIST,
    payload: list,
  };
}
