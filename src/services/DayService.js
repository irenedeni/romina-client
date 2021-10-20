// axios imported as http
import http from "../http-common"

const getAll = () => {
  return http.get("/trips")
}

const get = (id, tripId) => {
  return http.get(`/trips/${tripId}/days/${id}`)
}

const create = (data) => {
  return http.post("/trips", data)
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