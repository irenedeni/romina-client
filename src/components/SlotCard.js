import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { retrieveTasks } from "../actions/tasks"
import { deleteSlot, addTaskToSlot, removeTaskToSlot } from "../actions/slots"
import { Button as StyledButton, Dropdown, Form } from "../components"


const SlotCard = (props) => {

  const initialTaskState = {
    id: null,
    type: "",
    slotId: null,
  }

  const initialTaskToDeleteState = {
    id: null,
    type: "",
    slotId: null,
  }

  const { getTrip } = props

  const [taskToAdd, setTaskToAdd] = useState(initialTaskState)
  const [taskToRemove, setTaskToRemove] = useState(initialTaskToDeleteState)
  const [taskForm, setTaskForm] = useState(false)
  const [slotToDelete, setSlotToDelete] = useState({})

  const allTasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  const removeSlot = (id) => {
    setSlotToDelete({ ...id })
    dispatch(deleteSlot(id))
    refreshData()
  }

  const refreshData = () => {
    getTrip()
    setTaskToAdd(initialTaskState)
    setTaskToRemove(initialTaskToDeleteState)
    dispatch(retrieveTasks())
  }

  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    allTasks.find(task => {
      if(task.type == value){
        taskToAdd.id = task.id
        setTaskToAdd({ ...taskToAdd, [name]: value })
      }
    })
  }

  const updateContent = (id) => {
    const slotId = id
    dispatch(addTaskToSlot(taskToAdd.id, slotId, refreshData))
    refreshData()
  }


  const removeTaskFromSlot = (tasksSlots) => {
    const taskId = tasksSlots.taskId
    const slotId = tasksSlots.slotId
    allTasks.find(task => {
      if(task.id == taskId){
        const taskType = task.type
        taskToRemove.id = taskId
        taskToRemove.slotId = slotId
        taskToRemove.type = taskType
        setTaskToRemove({ ...taskToRemove })
      }
    })
    dispatch(removeTaskToSlot(taskToRemove.id, taskToRemove.slotId, refreshData))
    refreshData()
  }


  useEffect(()=> {
    getTrip()
    dispatch(retrieveTasks())
  }, [taskToRemove, taskToAdd, slotToDelete])


  const openTaskForm = () => {
    !taskForm ?
    (dispatch(retrieveTasks()) &&
    setTaskForm(true))
    : setTaskForm(false)
  }

  const { slot } = props

  return (
    <SlotContainer>
      <p>TIMEFRAME: <b>{slot.timeframe}</b></p>
      <p>LENGTH: <b>{slot.stayType}</b></p>
      <p>CARER: 
      {!slot.carer?.name ?
        <span> <Link to={`/edit/slots/${slot.id}`}>
          <Button outlined small text="+ Carer" />
        </Link>
        </span>
        : <span><b> {slot.carer.name}</b></span>
      }
      </p>
      {slot.notes &&
        <p>NOTES: <b>{slot.notes}</b></p>
      }
      TASKS:
      <TasksAndBtnContainer>
        {slot.tasks?.length > 0 &&
          <TasksContainer>
          {slot.tasks?.map((task, index) => {
            return (
              <Task key={index}>
                {task.type}
                <RemoveTask onClick={() => removeTaskFromSlot(task.tasksSlots)}>X</RemoveTask>
              </Task>
            )
          })}
        </TasksContainer>
        }
        <Button small text="+ Task" colour={({theme}) => theme.secondary} onClick={openTaskForm}/>
        {
        taskForm &&
        <>
          <Form>
            <Dropdown
              id="taskToAdd"
              name="type" 
              noDivider
              value={taskToAdd.type} 
              data={allTasks}
              onChange={handleInputChange}
            />
            <Button
              onClick={() => updateContent(slot.id)} 
              text="Submit"
              type="submit"
            />
          </Form>
        </>
        }
      </TasksAndBtnContainer>
      <SlotButtonsContainer>
        <Link to={`/edit/slots/${slot.id}`}>
          <Button text="Edit slot" small />
        </Link>
        <Button text="Delete slot" outlined small onClick={()=>removeSlot(slot.id)}/>
      </SlotButtonsContainer>
    </SlotContainer>
  )
}


const Button = styled(StyledButton)`
  margin: ${props => props.small ? "10px 0px" : "15px 0px"};
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 20px 15px;
  background-color: ${({ theme }) => theme.surface2};
  width: 200px;
  margin: 10px 0px;
  border-radius: ${({ theme }) => theme.mediumRadius};
  box-shadow: ${({ theme }) => theme.shadow2};
`

const SlotButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const TasksAndBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: ${({ theme }) => theme.mediumRadius};
  background-color: ${({ theme }) => theme.surface3};
  margin: 10px 0px;
`

const TasksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Task = styled.div`
  background-color: ${({ theme }) => theme.surface1};
  box-shadow: ${({ theme }) => theme.shadow2};
  border-radius: ${({ theme }) => theme.largeRadius};
  color: ${({ theme }) => theme.textOverlay};
  font-size: 10px;
  letter-spacing: 0.05rem;
  line-height: 11px;
  padding: 5px 10px;
  margin: 8px 5px;
  position: relative;
`

const RemoveTask = styled.div`
  background-color: ${({ theme }) => theme.bg};
  font-weight: 700;
  border-radius: ${({ theme }) => theme.largeRadius};
  width: 20px;
  height: 20px;
  position: absolute;
  top: -8px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover{
    cursor: pointer;
  }
`

export default SlotCard