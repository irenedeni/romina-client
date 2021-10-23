import { 
  CREATE_TASK,
  RETRIEVE_TASKS
} from "./types"

import TaskDataService from "../services/TaskService"

export const createTask = (type) => async (dispatch) => {

  try {
    const res = await TaskDataService.create({ type })
    dispatch({
      type: CREATE_TASK,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch(err){
    return Promise.reject(err)
  }
}

export const retrieveTasks = () => async (dispatch) => {
  try {
    const res = await TaskDataService.getAll()
    dispatch({
      type: RETRIEVE_TASKS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}