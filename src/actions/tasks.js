import { RETRIEVE_TASKS } from "./types"
import TaskDataService from "../services/TaskService"


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
