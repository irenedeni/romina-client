import {
  CREATE_TASK,
  // UPDATE_TASK,
  // DELETE_TASK,
  RETRIEVE_TASKS
} from "../actions/types"

const initialState = []

function taskReducer(tasks = initialState, action) {
  const { type, payload } = action

switch (type) {
  case CREATE_TASK:
    return [...tasks, payload]

  case RETRIEVE_TASKS:
    return payload

  // case UPDATE_TASK:
  //   return tasks.map((task) => {
  //     if(task.id === task.id){
  //       return {
  //         ...task,
  //         ...payload
  //       }
  //     } else {
  //       return task
  //     }
  //   })
    // case DELETE_TASK:
    // return tasks.filter(({ id }) => id !== payload.id)

  // case DELETE_ALL_TRIPS:
  //   return []
  
  default:
    return tasks
  }
} 

export default taskReducer