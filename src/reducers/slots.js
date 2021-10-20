import {
  CREATE_SLOT,
} from "../actions/types"

const initialState = []

function slotReducer(slots = initialState, action) {
  const { type, payload } = action

switch (type) {
  case CREATE_SLOT:
    return [...slots, payload]

  // case RETRIEVE_TRIPS:
  //   return payload

  // case UPDATE_TRIP:
  //   return trips.map((trip) => {
  //     if(trip.id === payload.id){
  //       return {
  //         ...trip,
  //         ...payload
  //       }
  //     } else {
  //       return trip
  //     }
  //   })

  // case DELETE_TRIP:
  //   return trips.filter(({ id }) => id !== payload.id)

  // case DELETE_ALL_TRIPS:
  //   return []
  
  default:
    return slots
  }
} 

export default slotReducer