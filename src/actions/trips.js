import { 
  CREATE_TRIP_AND_DAYS,
  RETRIEVE_TRIPS,
  UPDATE_TRIP,
  DELETE_ALL_TRIPS,
  DELETE_TRIP
} from "./types"

import TripDataService from "../services/TripService"

export const createTrip = (name, startDate, endDate, confirmed) => async (dispatch) => {
  try {
    const res = await TripDataService.create({ name, startDate, endDate, confirmed })
    dispatch({
      type: CREATE_TRIP_AND_DAYS,
      payload: res
    })
    return Promise.resolve(res)
  } catch(err){
    return Promise.reject(err)
  }
}

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

export const updateTrip = (id, data) => async (dispatch) => {
  try {
    const res = await TripDataService.update(id, data)
    dispatch({
      type: UPDATE_TRIP,
      payload: data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTrip = (id) => async (dispatch) => {
  try {
    await TripDataService.remove(id)
    dispatch({
      type: DELETE_TRIP,
      payload: { id }
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllTrips = () => async (dispatch) => {
  try {
    const res = await TripDataService.removeAll()
    dispatch({
      type: DELETE_ALL_TRIPS,
      payload: res.data
    }) 
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
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