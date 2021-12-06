import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import useModal from "../hooks/useModal"
import TaskService from "../services/TaskService"
import { retrieveTasks } from "../actions/tasks"
import { Template, Spacer, Button, Modal } from "../components"


const TasksList = () => {

  const [currentTask, setCurrentTask] = useState({})
  const [currentIndex, setCurrentIndex] = useState(null)
  const { show, toggleVisibility } = useModal()

  const tasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveTasks())
  }, [currentTask])

  const refreshData = () => {
    setCurrentTask({})
    setCurrentIndex(-1)
  }

  const setActiveTask = (task, index) => {
    setCurrentTask(task)
    setCurrentIndex(index)
  }

  const removeAllTasks = () => {
    TaskService.removeAll()
    refreshData()
  }

  const removeTask = (id) => {
    TaskService.remove(id)
    refreshData()
  }


  return (
    <Template direction="vertical">
      <ListContainer>
        <TitleContainer>
          <h2>Tasks list</h2>
          <Link to="/add_task">
            <AddButton text="+"/>
          </Link>
        </TitleContainer>
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
                  <CardButton small text="edit"/>
                </Link>
                <CardButton small text="delete" outlined onClick={() => removeTask(task.id)}/>
              </TaskButtonsDiv>
            </TaskContainer>
          )})
          }
        </TasksContainer>
        <Spacer medium />
        <Button onClick={toggleVisibility} text="REMOVE ALL" outlined/>
        <Modal display={show} hide={toggleVisibility}>
          <p>Are you sure you want to remove ALL tasks?</p>
          <Button text="YES" onClick={removeAllTasks} colour={({theme}) => theme.alert}/>
        </Modal>
      </ListContainer>
    </Template>
  )
}

const TitleContainer = styled.div`
  display: flex;
  width: 300px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`

const TaskName = styled.h4`
  font-weight: ${props => props.active && '700'};
  :hover {
    cursor: pointer;
    font-weight: 700;
  }
`
const CardButton = styled(Button)`
  margin: 10px 0px 0px 0px;
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
  border-radius: ${({ theme }) => theme.largeRadius};
  padding: 15px 20px 18px 20px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.surface1 };
  width: 250px;
`

const TaskButtonsDiv = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  width: 80%;
  justify-content: space-evenly;
  margin-top: 10px;
`
const AddButton = styled(Button)`
  margin: 15px 15px 15px 30px;
  padding: 8px 14px;
  width: min-content;
  border-radius: ${({ theme }) => theme.largeRadius};
`

export default TasksList