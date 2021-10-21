import { combineReducers } from "redux"
import trips from "./trips"
import slots from "./slots"
import carers from "./carers"

export default combineReducers({
  trips,
  slots,
  carers
})