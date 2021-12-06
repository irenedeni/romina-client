import {
  RETRIEVE_CARERS
} from "../actions/types"

const initialState = []

function carerReducer(carers = initialState, action) {
  const { type, payload } = action

switch (type) {

  case RETRIEVE_CARERS:
    return payload
  
  default:
    return carers
  }
} 

export default carerReducer