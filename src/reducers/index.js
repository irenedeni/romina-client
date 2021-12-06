import { combineReducers } from "redux"
import trips from "./trips"
import carers from "./carers"
import tasks from "./tasks"


export default combineReducers({
  trips,
  carers,
  tasks
})