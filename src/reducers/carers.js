import {
  CREATE_CARER,
  RETRIEVE_CARERS,
  UPDATE_CARER,
  DELETE_CARER,
  DELETE_ALL_CARERS
} from "../actions/types"

const initialState = []

function carerReducer(carers = initialState, action) {
  const { type, payload } = action

switch (type) {
  case CREATE_CARER:
    return [...carers, payload]

  case RETRIEVE_CARERS:
    return payload

  case UPDATE_CARER:
    return carers.map((carer) => {
      if(carer.id === payload.id){
        return {
          ...carer,
          ...payload
        }
      } else {
        return carer
      }
    })

  case DELETE_CARER:
    return carers.filter(({ id }) => id !== payload.id)

  case DELETE_ALL_CARERS:
    return []
  
  default:
    return carers
  }
} 

export default carerReducer