import {
  CREATE_CARER,
} from "../actions/types"

const initialState = []

function carerReducer(carers = initialState, action) {
  const { type, payload } = action

switch (type) {
  case CREATE_CARER:
    return [...carers, payload]

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
    return carers
  }
} 

export default carerReducer