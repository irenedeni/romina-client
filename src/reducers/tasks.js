import { RETRIEVE_TASKS } from "../actions/types"

const initialState = []

function taskReducer(tasks = initialState, action) {
  const { type, payload } = action

switch (type) {
  case RETRIEVE_TASKS:
    return payload
  
  default:
    return tasks
  }
} 

export default taskReducer