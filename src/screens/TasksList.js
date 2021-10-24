import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {
  retrieveTasks,
  findTasksByName,
  deleteAllTasks,
  deleteTask
} from "../actions/tasks"
import { Input, Template, Form, Spacer, Button } from "../components"


const TasksList = (props) => {

  const [currentTask, setCurrentTask] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const tasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveTasks())
  }, [dispatch])

  const refreshData = () => {
    setCurrentTask(null)
    setCurrentIndex(-1)
  }

  const setActiveTask = (task, index) => {
    setCurrentTask(task)
    setCurrentIndex(index)
  }

  const removeAllTasks = () => {
    dispatch(deleteAllTasks())
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeTask = (id) => {
    dispatch(deleteTask(id))
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }


  return (
    <Template direction="vertical">
      <ListContainer>
        <h2>Tasks list</h2>
        <Link to="/add_task">
          <AddButton text="ADD TASK"/>
        </Link>
        <TasksContainer>
          {tasks &&
          tasks.map((task, index) => {
          return (
            <TaskContainer 
              key={index}
                className={index === currentIndex ? "active" : ""}
                style={{marginBottom: '20px'}}
              >
              <TaskName onClick={() => setActiveTask(task, index)} active={currentTask && (index === currentIndex)}>
                {task.type}
              </TaskName>
              <TaskButtonsDiv active={currentTask && (index === currentIndex)}>
                <Link to={"/edit/tasks/" + task.id}>
                  <CardButton small text="edit" style={{marginTop: "10px"}}/>
                </Link>
                <CardButton small text="delete" style={{marginTop: "10px"}} onClick={() => removeTask(task.id)}/>
              </TaskButtonsDiv>
            </TaskContainer>
          )})
          }
        </TasksContainer>
        <Spacer medium />
        <Button onClick={removeAllTasks} text="REMOVE ALL"/>
      </ListContainer>
    </Template>
  )
}

const TaskName = styled.h4`
  font-weight: ${props => props.active && '700'};
  :hover {
    cursor: pointer;
    font-weight: 700;
  }
`
const CardButton = styled(Button)`
  margin-right: 10px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const TasksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
`

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 15px 20px;
  margin: 10px;
  justify-content: space-between;
  background-color: #e9e6e6;
  width: 250px;
`

const TaskButtonsDiv = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  width: 100%;
`
const AddButton = styled(Button)`
  margin: 15px;
`

export default TasksList