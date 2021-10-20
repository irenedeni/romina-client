import { combineReducers } from "redux"
import trips from "./trips"
import slots from "./slots"

export default combineReducers({
  trips,
  slots
})