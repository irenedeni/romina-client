import { 
  CREATE_SLOT,
  UPDATE_SLOT,
  DELETE_SLOT,
  ADD_TASK_TO_SLOT
} from "./types"

import SlotDataService from "../services/SlotService"

export const createSlot = (dayId, data) => async (dispatch) => {

const { timeframe, stayType, notes, carerId } = data

  try {
    const res = await SlotDataService.create({ dayId, timeframe, stayType, notes, carerId })
    dispatch({
      type: CREATE_SLOT,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch(err){
    return Promise.reject(err)
  }
}

export const updateSlot = (id, data) => async (dispatch) => {
  try {
    const res = await SlotDataService.update(id, data)
    dispatch({
      type: UPDATE_SLOT,
      payload: data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteSlot = (id) => async (dispatch) => {
  try {
    await SlotDataService.remove(id)
    dispatch({
      type: DELETE_SLOT,
      payload: { id }
    })
  } catch (err) {
    console.log(err)
  }
}

export const addTaskToSlot = (slotId, taskId) => async (dispatch) => {
  try {
    const res = await SlotDataService.addTaskToSlot(slotId, taskId)
    dispatch({
      type: ADD_TASK_TO_SLOT,
      payload: { slotId, taskId }
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

// export const retrieveSlots = () => async (dispatch) => {
//   try {
//     const res = await SlotDataService.getAll()
//     dispatch({
//       type: RETRIEVE_SLOTS,
//       payload: res.data
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }





// export const deleteAllSlots = () => async (dispatch) => {
//   try {
//     const res = await SlotDataService.removeAll()
//     dispatch({
//       type: DELETE_ALL_SLOTS,
//       payload: res.data
//     }) 
//     return Promise.resolve(res.data)
//   } catch (err) {
//     return Promise.reject(err)
//   }
// }

// export const findSlotsByName = (name) => async (dispatch) => {
//   try {
//     const res = await SlotDataService.findByName(name)
//     dispatch({
//       type: RETRIEVE_SLOTS,
//       payload: res.data
//     })
//   } catch (err) {
//     console.log(err)
//   }
