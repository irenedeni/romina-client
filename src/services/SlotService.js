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


const remove = (id) => {
  return http.delete(`/slots/${id}`)
}


const SlotService = {
  addTaskToSlot,
  create,
  update,
  remove,
  get,
  removeTaskToSlot
}

export default SlotService