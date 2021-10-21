import http from "../http-common"


const create = (data) => {
  return http.post(`/days/${data.dayId}/slots`, data)
}

const update = (id, data) => {
  return http.put(`/days/${data.dayId}/slots/${id}`, data)
}

const get = (id, dayId, tripId) => {
  return http.get(`/days/${dayId}/slots/${id}`)
}


// const addTask = (id, dayId, tripId, slotId, data) => {
//   return http.put(`/trips/${tripId}/days/${dayId}/slots/${slotId}/tasks/${id}`, data)
// }


const remove = (id, data) => {
  return http.delete(`/days/${data.dayId}/slots/${id}`)
}


// const removeAll = (dayId, tripId) => {
//   return http.delete(`/trips/${tripId}/days/${dayId}/slots`)
// }


const SlotService = {
  // addTask,
  create,
  update,
  remove,
  // removeAll,
  get
}

export default SlotService