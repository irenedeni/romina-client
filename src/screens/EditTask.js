import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { updateTask, deleteTask } from "../actions/tasks"
import TaskDataService from "../services/TaskService"
import { Input, Template, Form, Button as StyledButton } from "../components"


const EditTask = (props) => {
  const initialTaskState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTask, setCurrentTask] = useState(initialTaskState)
  const [message, setMessage] = useState("")

  console.log("currentTask", currentTask)

  const dispatch = useDispatch()

  const getTask = id => {
    TaskDataService.get(id)
    .then(res => {
      setCurrentTask(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTask(props.match.params.id)
  }, [props.match.params.id])


  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
      setCurrentTask({ ...currentTask, [name]: value })
    } else setCurrentTask({ ...currentTask, [name]: checked })
  }


  const updateContent = () => {
    dispatch(updateTask(currentTask.id, currentTask))
    .then(res => {
      console.log(res)
      setMessage("task updated successfully")
      props.history.goBack()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeTask = () => {
    dispatch(deleteTask(currentTask.id))
    .then(()=> {
      props.history.push("/tasks")
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <Template>
      {currentTask ? (
        <div>
          <h2>UPDATE Task</h2>
          <Form>
            <Input
              type="text"
              id="type"
              name="type"
              value={currentTask.type}
              onChange={handleInputChange}
            />
          </Form>
          <Button
            type="submit"
            text="Update"
            onClick={updateContent}
          />
          <Button text="Delete" onClick={removeTask}/>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Select a task</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 0px 10px 10px 0px;
`

export default EditTask