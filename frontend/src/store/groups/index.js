import {
  SET_GROUPS_LIST,
  SET_MY_GROUPS_LIST,
  SET_SELECTED_GROUP,
} from "./actions";

export * from "./actions";
export * from "./thunks";

const initialState = {
  allGroups: [],
  myGroups: [],
  selected: null,
};

export default function groupsReducer(state = initialState, action) {
  let nextState = state;

  switch (action.type) {
    case SET_GROUPS_LIST:
      nextState = Object.assign({}, nextState);
      nextState.allGroups = action.payload;
      break;
    case SET_SELECTED_GROUP:
      nextState = Object.assign({}, nextState);
      nextState.selected = action.payload;
      break;
    case SET_MY_GROUPS_LIST:
      nextState = Object.assign({}, nextState);
      nextState.myGroups = action.payload;
      break;
  }

  return nextState;
}
