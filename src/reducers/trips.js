import { RETRIEVE_TRIPS } from "../actions/types"

const initialState = []

function tripReducer(trips = initialState, action) {
  const { type, payload } = action

switch (type) {
  case RETRIEVE_TRIPS:
    return payload
  
  default:
    return trips
  }
} 

export default tripReducer