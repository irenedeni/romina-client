import { RETRIEVE_TRIPS } from "./types"

import TripDataService from "../services/TripService"

export const retrieveTrips = () => async (dispatch) => {
  try {
    const res = await TripDataService.getAll()
    dispatch({
      type: RETRIEVE_TRIPS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const findTripsByName = (name) => async (dispatch) => {
  try {
    const res = await TripDataService.findByName(name)
    dispatch({
      type: RETRIEVE_TRIPS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}