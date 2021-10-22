import { 
  CREATE_CARER,
  RETRIEVE_CARERS
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