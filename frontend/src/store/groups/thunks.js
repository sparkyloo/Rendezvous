import { csrfFetch } from "../csrf";
import { setGroupsList } from "./actions";

export function getAllGroups() {
  return async (dispatch) => {
    const response = await csrfFetch("/api/groups");
    const data = await response.json();
    dispatch(setGroupsList(data.Groups));
  };
}
