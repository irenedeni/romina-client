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


const addTask = (id, slotId) => {
  return http.put(`/slots/${slotId}/tasks/${id}`)
}


const remove = (id, data) => {
  return http.delete(`/days/${data.dayId}/slots/${id}`)
}


// const removeAll = (dayId, tripId) => {
//   return http.delete(`/trips/${tripId}/days/${dayId}/slots`)
// }


const SlotService = {
  addTask,
  create,
  update,
  remove,
  // removeAll,
  get
}

export default SlotService