import { csrfFetch } from "../csrf";
import { setGroupsList, setSelectedGroup } from "./actions";

export function getAllGroups() {
  return async (dispatch) => {
    const response = await csrfFetch("/api/groups");
    const data = await response.json();
    dispatch(setGroupsList(data.Groups));
  };
}

export function getSelectedGroup(groupId) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    const data = await response.json();
    dispatch(setSelectedGroup(data));
  };
}

// export function get________(){
//   return async(dispatch)=>{
//     //
//   }
// }
