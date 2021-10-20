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
            <div>Day {`${index + 1}:`} {moment(day.date).calendar(calendarObject)}</div>  
            {console.log(day)}
            {day.slots?.map((slot, index) => {
              return (
                <div key={index} style={{border: "1px solid black", maxWidth: "max-content", padding: "5px 20px", margin: "10px 0px"}}>
                  <b>SLOT</b>
                  <p>TIMEFRAME: {slot.timeframe}</p>
                  <p>LENGTH: {slot.stayType}</p>
                  <p>CARER: {slot.carer?.name}</p>
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
                </div>
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
          <p>Select a trip</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 20px 10px 20px 0px;
`

export default Trip