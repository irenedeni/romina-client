import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTask } from "../actions/tasks"
import { Input, Template, Form, Button } from "../components"

const AddTask = (props) => {

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
    setTimeout(()=>props.history.push("/tasks"), 3000)
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
        <Form>
          <Input 
            type="text" 
            id="type" 
            name="type" 
            value={task.type} 
            required 
            onChange={handleInputChange}
          />
          <Button
            onClick={saveTask} 
            text="Submit"
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New task submitted successfully</h4>

        <Button onClick={newTask} text="Add more" />
        <p>Add more or wait to be redirected to the general tasks page</p>
        <Button onClick={() => props.history.goBack()} text="Go back"/>
      </div>
  }
  </Template>
  )
}

export default AddTask