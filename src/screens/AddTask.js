import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTask } from "../actions/tasks"
import { Toggle, Input, Template, Form, Button, Dropdown } from "../components"

const AddTask = () => {

  const initialTaskState = {
    id: null,
    type: ""
  }
  const [task, setTask] = useState(initialTaskState)

  const [submitted, setSubmitted] = useState()

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { name, value } = event.target
    setTask({ ...task, [name]: value })
  }

  const saveTask = () => {
    const { type } = task
    dispatch(createTask(type))
    .then(data => {
      setTask({
        id: data.id,
        type: data.type
      })
    })
    .catch(e => {
      console.log(e)
    })
    setSubmitted(true)
  }

  const newTask = () => {
    setTask(initialTaskState)
    setSubmitted(false)
  }

  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add new task</h1>
        <Form onClick={saveTask}>
          <Input 
            type="text" 
            id="type" 
            name="type" 
            value={task.type} 
            required 
            onChange={handleInputChange}
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New task submitted successfully</h4>
        <Button onClick={newTask} text="Add more" />
      </div>
  }
  </Template>
  )
}

export default AddTask