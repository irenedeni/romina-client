import http from "../http-common"


const create = (data) => {
  return http.post(`/tasks`, data)
}

const getAll = (data) => {
  return http.get(`/tasks`, data)
}


const get = id => {
  return http.get(`/tasks/${id}`)
}


const update = (id, data) => {
  return http.put(`/tasks/${id}`, data)
}

const remove = id => {
  return http.delete(`/tasks/${id}`)
}

const removeAll = () => {
  return http.delete("/tasks")
}



const TaskService = {
  create,
  getAll,
  get,
  update,
  remove,
  removeAll
}

export default TaskService