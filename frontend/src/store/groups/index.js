import { SET_GROUPS_LIST } from "./actions";

export * from "./actions";
export * from "./thunks";

const initialState = {
  allGroups: [],
};

export default function groupsReducer(state = initialState, action) {
  let nextState = state;

  switch (action.type) {
    case SET_GROUPS_LIST:
      nextState = Object.assign({}, nextState);
      nextState.allGroups = action.payload;
      break;
  }

  return nextState;
}
