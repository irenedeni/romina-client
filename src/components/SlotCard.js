import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { retrieveTasks } from "../actions/tasks"
import { deleteSlot, addTaskToSlot } from "../actions/slots"
import { Button as StyledButton, Dropdown, Form } from "../components"


const SlotCard = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const initialTaskState = {
    id: null,
    type: "",
    slotId: null,
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)
  const [taskToAdd, setTaskToAdd] = useState(initialTaskState)

  const tasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(retrieveTasks())
  }, [dispatch])


  const removeSlot = (id) => {
    dispatch(deleteSlot(id))
    .then((res)=> {
      console.log("res", res)
      setCurrentTrip(currentTrip)
      console.log("slot deleted successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const refreshData = () => {
    setTaskToAdd(initialTaskState)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    tasks.find(task => {
      if(task.type == value){
        const id = task.id
        taskToAdd.id = id
        return (
          setTaskToAdd({ ...taskToAdd, [name]: value })
        )
      }
      
    })
  }

  const updateContent = (id) => {
    const slotId = id
    console.log("taskToAdd ID", taskToAdd.id)
    console.log("slot ID", slotId)
    dispatch(addTaskToSlot(taskToAdd.id, slotId))
    .then(res => {
      console.log(res)
      refreshData()
    })
    .catch(e => {
      console.log(e)
    })
  }



  const openTaskForm = (id) => {
    !taskToAdd.slotId ?
    setTaskToAdd({ ...taskToAdd, slotId: id })
    :
    setTaskToAdd({ ...taskToAdd, slotId: null })
  }

  const { slot } = props

  console.log("taskToAdd", taskToAdd)
  
  return (
    <SlotContainer>
      <b>SLOT</b>
      <p>TIMEFRAME: <b>{slot.timeframe}</b></p>
      <p>LENGTH: <b>{slot.stayType}</b></p>
      <p>CARER: 
      {!slot.carer?.name ?
        <span> <Link to={`/edit/slots/${slot.id}`}>
          <Button outlined small text="Add carer" />
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
              </Task>
            )
          })}
        </TasksContainer>
        }
        <Button small text="Add task" color={({theme}) => theme.secondary} onClick={()=>openTaskForm(slot.id)}/>
        {(taskToAdd.slotId === slot.id) &&
        <>
          <Form>
            <Dropdown
              id="taskToAdd"
              name="type" 
              value={taskToAdd.type} 
              data={tasks}
              onChange={handleInputChange}
            />
            <Button
            onClick={updateContent(slot.id)} 
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
  margin: ${props => props.small ? "5px 5px 5px 0px" : "10px 10px 10px 0px"};
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.surface2};
  width: 200px;
  margin: 10px 0px;
  border-radius: ${({ theme }) => theme.mediumRadius};
  box-shadow: ${({ theme }) => theme.shadow2};
`

const SlotButtonsContainer = styled.div`
  display: flex;
  width: 100%;
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
  border-radius: 2px;
  color: ${({ theme }) => theme.textOverlay};
  font-size: 10px;
  line-height: 11px;
  padding: 3px 5px;
  margin: 5px;
`

export default SlotCard