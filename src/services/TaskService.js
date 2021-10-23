import http from "../http-common"


const create = (data) => {
  return http.post(`/tasks`, data)
}

const getAll = (data) => {
  return http.get(`/tasks`, data)
}



const TaskService = {
  create,
  getAll
}

export default TaskService