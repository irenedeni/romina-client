import { combineReducers } from "redux"
import trips from "./trips"
import slots from "./slots"
import carers from "./carers"
import tasks from "./tasks"


export default combineReducers({
  trips,
  slots,
  carers,
  tasks
})