import http from "../http-common"

const getAll = (tripId) => {
  return http.get(`/trips/${tripId}/days/`)
}

const get = (id, tripId) => {
  return http.get(`/trips/${tripId}/days/${id}`)
}

const create = (id, data) => {
  return http.post(`/trips/${id}/days`, data)
}

const update = (id, tripId, data) => {
  return http.put(`/trips/${tripId}/days/${id}`, data)
}

const remove = (id, tripId, data) => {
  return http.delete(`/trips/${tripId}/days/${id}`, data)
}

const removeAll = (tripId) => {
  return http.delete(`/trips/${tripId}/days`)
}


const DayService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
}

export default CarerService