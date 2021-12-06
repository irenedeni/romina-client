import { RETRIEVE_CARERS } from "./types"
import CarerDataService from "../services/CarerService"

export const retrieveCarers = () => async (dispatch) => {
  try {
    const res = await CarerDataService.getAll()
    dispatch({
      type: RETRIEVE_CARERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const findCarersByName = (name) => async (dispatch) => {
  try {
    const res = await CarerDataService.findByName(name)
    dispatch({
      type: RETRIEVE_CARERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}