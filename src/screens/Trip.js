import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"

import { calendarObject, orderSlotsByTimeframe } from "../lib/functionsAndObjects"
import { updateTrip, deleteTrip } from "../actions/trips"
import { retrieveTasks } from "../actions/tasks"
import TripDataService from "../services/TripService"
import { Template, Button as StyledButton } from "../components"


const Trip = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)

  const tasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  const getTrip = id => {
    TripDataService.get(id)
    .then(res => {
      setCurrentTrip(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTrip(props.match.params.id)
  }, [props.match.params.id])

  useEffect(()=> {
    dispatch(retrieveTasks())
  }, [dispatch])


  const removeTrip = () => {
    dispatch(deleteTrip(currentTrip.id))
    .then(()=> {
      props.history.push("/trips")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const addTripToSlot = (taskType) => {
    const taskToAdd = tasks.find(task => task.type == taskType)
    console.log("taskToAdd", taskToAdd)
  }
  
console.log("currentTrip", currentTrip)

  return (
    <Template>
      {currentTrip?.id ? (
        <PageContainer>
          <h1>{currentTrip.name.toUpperCase()}</h1>
          <TripContainer>
          {currentTrip.days?.map((day, index) => {
          return (
          <DayContainer key={index}>
            <h3>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</h3>  
            <Link to={`/days/${day.id}/slots`}>
              <Button text="Add slot"/>
            </Link>
            {day.slots.length > 0 && orderSlotsByTimeframe(day.slots).map((slot, index) => {
              return (
                <SlotContainer key={index}>
                  <b>SLOT</b>
                  <p>TIMEFRAME: {slot.timeframe}</p>
                  <p>LENGTH: {slot.stayType}</p>
                  <p>CARER: 
                  {!slot.carer?.name ?
                    <span> <Link to={`/edit/slots/${slot.id}`}>
                      <Button outlined small text="Add carer" />
                    </Link>
                    </span>
                    : <span><b> {slot.carer.name}</b></span>
                  }
                  </p>
                  TASKS:
                  <TasksAndBtnContainer>
                    {slot.tasks?.length > 0 &&
                      <TasksContainer>
                      {slot.tasks?.map((task, index) => {
                        return (
                          <Task key={index}>
                            {index + 1}) {task.type}
                          </Task>
                        )
                      })}
                    </TasksContainer>
                    }
                    <Button small text="Add task" />
                  </TasksAndBtnContainer>
                  <SlotButtonsContainer>
                    <Link to={`/edit/slots/${slot.id}`}>
                      <Button text="Edit slot" small/>
                    </Link>
                    <Button text="Delete slot" color="#6c6c6c" outlined small/>
                  </SlotButtonsContainer>
                </SlotContainer>
              )
            })}
          </DayContainer>
          )}
          )}
          </TripContainer>
            <Link
              to={`/edit/trips/${currentTrip.id}`}>
              <Button text="Edit trip" />
            </Link>
              <Button text="Delete trip" onClick={removeTrip}/>
        </PageContainer>
      ) : (
        <NotFoundContainer>
          <p>The trip selected does not exist</p>
        </NotFoundContainer>
      )}
    </Template>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const TripContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #EAEAEA;
  margin: 20px 0px;
  justify-content: center;
`

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: #D8D8D8;
`

const Button = styled(StyledButton)`
  margin: ${props => props.small ? "5px 5px 5px 0px" : "10px 10px 10px 0px"};
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #e9e6e6;
  width: 200px;
  margin: 10px 0px;
`

const SlotButtonsContainer = styled.div`
  display: flex;
  width: 100%;
`

const TasksAndBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #D8D8D8;
  margin: 10px 0px;
`

const TasksContainer = styled.div`
  display: flex;
  color: #fff;
`

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
`

const Task = styled.div`
  background-color: #fff;
  border-radius: 2px;
  color: #333;
  font-size: 10px;
  line-height: 11px;
  padding: 3px 5px;
`

export default Trip