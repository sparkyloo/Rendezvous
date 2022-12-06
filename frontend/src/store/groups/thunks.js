import { csrfFetch } from "../csrf";
import { setGroupsList, setSelectedGroup,setMyGroupsList } from "./actions";

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

export function getMyGroups() {
  return async (dispatch) => {
    const response = await csrfFetch("/api/groups/current");
    const data = await response.json();
    dispatch(setMyGroupsList(data.Groups));
  };
}

export function createNewGroup({ name, about, type, isPrivate, city, state }) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/groups/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        about,
        type,
        city,
        state,
        private: isPrivate,
      }),
    });
    const data = await response.json();
    return data.id;
  };
}

export function updateGroup({ name, about, type, isPrivate, city, state }){
  return async(dispatch)=>{
    const response = await csrfFetch(`/api/groups/`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        about,
        type,
        city,
        state,
        private: isPrivate,
      }),
    });
    const data = await response.json();
    return data.id;
  }
}

export function deleteGroup(groupId){
  return async(dispatch)=>{
    const response = await csrfFetch(`/api/groups/${groupId}`,{
      method: "DELETE"
    });
    dispatch(setSelectedGroup(null));
  }
}

// export function get________(){
//   return async(dispatch)=>{
//     //
//   }
// }
