export const SET_GROUPS_LIST = "groups/setList";

export function setGroupsList(list) {
  return {
    type: SET_GROUPS_LIST,
    payload: list,
  };
}

export const SET_SELECTED_GROUP = "groups/setSelected";

export function setSelectedGroup(group) {
  return {
    type: SET_SELECTED_GROUP,
    payload: group,
  };
}
