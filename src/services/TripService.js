// axios imported as http
import http from "../http-common"

const getAll = () => {
  return http.get("/trips")
}

const get = id => {
  return http.get(`/trips/${id}`)
}

const create = data => {
  return http.post("/trips", data)
}

const update = (id, data) => {
  return http.put(`/trips/edit/${id}`, data)
}

const remove = id => {
  return http.delete(`/trips/${id}`)
}

const removeAll = () => {
  return http.delete("/trips")
}

const findByName = name => {
  return http.get(`/trips?name=${name}`)
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

export default TripService