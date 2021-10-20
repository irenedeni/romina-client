// axios imported as http
import http from "../http-common"

const get = (id, tripId) => {
  return http.get(`/trips/${tripId}/days/${id}`)
}

const create = (id, data) => {
  return http.post(`/trips/${id}/days`, data)
}

const update = (id, data) => {
  return http.put(`/carers/${id}`, data)
}

const remove = id => {
  return http.delete(`/carers/${id}`)
}

const removeAll = () => {
  return http.delete("/carers")
}

const findByName = name => {
  return http.get(`/carers?name=${name}`)
}

const TripService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
}

export default CarerService