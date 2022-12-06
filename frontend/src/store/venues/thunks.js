import { csrfFetch } from "../csrf";
import { setVenuesList, setSelectedVenue } from "./actions";

export function getAllVenues() {
  return async (dispatch) => {
    const response = await csrfFetch("/api/venues");
    const data = await response.json();
    dispatch(setVenuesList(data.Venues));
  };
}

export function getSelectedVenue(venueId) {
  return async (dispatch) => {
    const response = await csrfFetch(`/api/venues/${venueId}`);
    const data = await response.json();
    dispatch(setSelectedVenue(data));
  };
}

// export function createNewVenue({ }) {
//   return async (dispatch) => {
//     const response = await csrfFetch(`/api/venues/`, {
//       method: "POST",
//       body: JSON.stringify({

//       }),
//     });
//     const data = await response.json();
//     return data.id;
//   };
// }

// export function updateVenue({ }){
//   return async(dispatch)=>{
//     const response = await csrfFetch(`/api/venues/`, {
//       method: "PUT",
//       body: JSON.stringify({

//       }),
//     });
//     const data = await response.json();
//     return data.id;
//   }
// }

// export function deleteVenue(venueId){
//   return async(dispatch)=>{
//     const response = await csrfFetch(`/api/venues/${venueId}`,{
//       method: "DELETE"
//     });
//     dispatch(setSelectedVenue(null));
//   }
// }
