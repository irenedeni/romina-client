import http from "../http-common"


const create = (data) => {
  return http.post(`/tasks`, data)
}



const TaskService = {
  create,
}

export default TaskService