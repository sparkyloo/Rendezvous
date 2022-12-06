import {
  SET_VENUES_LIST,
  SET_SELECTED_VENUE,
} from "./actions";

export * from "./actions";
export * from "./thunks";

const initialState = {
  allVenues: [],
  selected: null,
};

export default function venuesReducer(state = initialState, action) {
  let nextState = state;

  switch (action.type) {
    case SET_VENUES_LIST:
      nextState = Object.assign({}, nextState);
      nextState.allVenues = action.payload;
      break;
    case SET_SELECTED_VENUE:
      nextState = Object.assign({}, nextState);
      nextState.selected = action.payload;
      break;
  }

  return nextState;
}
