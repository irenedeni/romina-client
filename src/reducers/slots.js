import {
  CREATE_SLOT,
  UPDATE_SLOT,
  DELETE_SLOT
} from "../actions/types"

const initialState = []

function slotReducer(slots = initialState, action) {
  const { type, payload } = action

switch (type) {
  case CREATE_SLOT:
    return [...slots, payload]

  // case RETRIEVE_TRIPS:
  //   return payload

  case UPDATE_SLOT:
    return slots.map((slot) => {
      if(slot.id === payload.id){
        return {
          ...slot,
          ...payload
        }
      } else {
        return slot
      }
    })
    case DELETE_SLOT:
    return slots.filter(({ id }) => id !== payload.id)

  // case DELETE_ALL_TRIPS:
  //   return []
  
  default:
    return slots
  }
} 

export default slotReducer