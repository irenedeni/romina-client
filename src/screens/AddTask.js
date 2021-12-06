import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Input, Template, Form, Button } from "../components"
import TaskService from "../services/TaskService"

const AddTask = (props) => {

  const initialTaskState = {
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
    TaskService.create(task)
    setSubmitted(true)
    setTimeout(() => props.history.push("/tasks"), 3000)
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
      <ButtonsDiv>
        <h4>New task submitted successfully</h4>
        <Button onClick={newTask} text="Add more" style={{ marginTop: "20px" }}/>
        <p>Add more or wait to be redirected to the general tasks page</p>
        <Button onClick={() => props.history.goBack()} text="Go back" style={{ marginTop: "10px" }} outlined/>
      </ButtonsDiv>
  }
  </Template>
  )
}

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default AddTask