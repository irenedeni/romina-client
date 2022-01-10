import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TaskService from "../services/TaskService"
import { Input, Template, Form, Button as StyledButton } from "../components"


const EditTask = (props) => {
  const initialTaskState = {
    id: null,
    type: "",
  }

  const [currentTask, setCurrentTask] = useState(initialTaskState)
  const [message, setMessage] = useState("")

  const getTask = id => {
    TaskService.get(id)
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
    TaskService.update(currentTask.id, currentTask)
    .then(res => {
      console.log(res)
      setMessage("Task updated successfully! Wait to be redirected")
      setTimeout(() => props.history.goBack(), 1500)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeTask = () => {
    TaskService.remove(currentTask.id)
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
          <h1>UPDATE Task</h1>
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