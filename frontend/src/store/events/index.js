import {
  SET_EVENTS_LIST,
  SET_GROUP_EVENTS_LIST,
  SET_SELECTED_EVENT,
} from "./actions";

export * from "./actions";
export * from "./thunks";

const initialState = {
  allEvents: [],
  groupEvents: [],
  selected: null,
};

export default function eventsReducer(state = initialState, action) {
  let nextState = state;

  switch (action.type) {
    case SET_EVENTS_LIST:
      nextState = Object.assign({}, nextState);
      nextState.allEvents = action.payload;
      break;
    case SET_SELECTED_EVENT:
      nextState = Object.assign({}, nextState);
      nextState.selected = action.payload;
      break;
    case SET_GROUP_EVENTS_LIST:
      nextState = Object.assign({}, nextState);
      nextState.groupEvents = action.payload;
      break;
  }

  return nextState;
}
