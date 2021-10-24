import { 
  CREATE_CARER,
  RETRIEVE_CARERS,
  DELETE_ALL_CARERS,
  UPDATE_CARER,
  DELETE_CARER
} from "./types"

import CarerDataService from "../services/CarerService"

export const createCarer = (name, email, phone, professional) => async (dispatch) => {

  try {
    const res = await CarerDataService.create({ name, email, phone, professional })
    dispatch({
      type: CREATE_CARER,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch(err){
    return Promise.reject(err)
  }
}


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

export const updateCarer = (id, data) => async (dispatch) => {
  try {
    const res = await CarerDataService.update(id, data)
    dispatch({
      type: UPDATE_CARER,
      payload: data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteCarer = (id) => async (dispatch) => {
  try {
    await CarerDataService.remove(id)
    dispatch({
      type: DELETE_CARER,
      payload: { id }
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllCarers = () => async (dispatch) => {
  try {
    const res = await CarerDataService.removeAll()
    dispatch({
      type: DELETE_ALL_CARERS,
      payload: res.data
    }) 
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}