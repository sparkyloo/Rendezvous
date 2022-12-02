export const SET_GROUPS_LIST = "groups/setList";

export function setGroupsList(list) {
  return {
    type: SET_GROUPS_LIST,
    payload: list,
  };
}
