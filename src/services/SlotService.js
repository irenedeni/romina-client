import http from "../http-common"


const create = (data) => {
  return http.post(`/days/${data.dayId}/slots`, data)
}

const update = (id, data) => {
  return http.put(`/days/${data.dayId}/slots/${id}`, data)
}

const get = (id, dayId) => {
  return http.get(`/days/${dayId}/slots/${id}`)
}


const addTaskToSlot = (id, slotId) => {
  return http.put(`/slots/${slotId}/tasks/${id}`)
}

const removeTaskToSlot = (id, slotId) => {
  return http.delete(`/slots/${slotId}/tasks/${id}`)
}


const remove = (id, data) => {
  return http.delete(`/slots/${id}`)
}


// const removeAll = (dayId, tripId) => {
//   return http.delete(`/trips/${tripId}/days/${dayId}/slots`)
// }


const SlotService = {
  addTaskToSlot,
  create,
  update,
  remove,
  get,
  removeTaskToSlot
  // removeAll,
}

export default SlotService