export const SET_VENUES_LIST = "venues/setList";

export function setVenuesList(list) {
  return {
    type: SET_VENUES_LIST,
    payload: list,
  };
}

export const SET_SELECTED_VENUE = "venues/setSelected";

export function setSelectedVenue(venue) {
  return {
    type: SET_SELECTED_VENUE,
    payload: venue,
  };
}
