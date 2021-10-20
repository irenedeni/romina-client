import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"

import { calendarObject } from "../lib/tripFunctions"
import { updateTrip, deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"
import { Toggle, Input, Template, Form, Button as StyledButton, Dropdown } from "../components"


const Trip = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)
  const [message, setMessage] = useState("")

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


  const removeTrip = () => {
    dispatch(deleteTrip(currentTrip.id))
    .then(()=> {
      props.history.push("/trips")
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <Template>
      <div>
      </div>
      {currentTrip ? (
        <div>
          <h2>{currentTrip.name}</h2>
          {currentTrip.days?.map((day, index) => (
          <div key={index}>
            <div><b>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</b></div>  
            <Link to={`/days/${day.id}/slots`}>
              <Button text="add slot" small/>
            </Link>
            {day.slots?.map((slot, index) => {
              return (
                <SlotContainer key={index}>
                  <b>SLOT</b>
                  <p>TIMEFRAME: {slot.timeframe}</p>
                  <p>LENGTH: {slot.stayType}</p>
                  <p>CARER: {slot.carer?.name}</p>
                  <Button small text="Add carer" />
                  <div>
                    {slot.tasks?.map((task, index) => {
                      return (
                        <div key={index}>
                          <p>Task #{index+1}</p>
                          <p>{task.type}</p>
                        </div>
                      )
                    })}
                  </div>
                </SlotContainer>
              )
            })}
          </div>
          )
          )}
            <Link
              to={`/edit/trips/${currentTrip.id}`}>
              <Button text="Edit" />
            </Link>
           <Button text="Delete trip" onClick={removeTrip}/>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>The trip selected does not exist</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 20px 10px 20px 0px;
`

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 10px;
  background-color: #e9e6e6;
  width: 250px;
`

export default Trip