import React, { useState } from "react"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { Toggle, Input, Template, Form, Button } from "../components"
import TripService from "../services/TripService"

const AddTrip = () => {

  const initialTripState = {
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    confirmed: false
  }
  const [trip, setTrip] = useState(initialTripState)

  const [submitted, setSubmitted] = useState()

  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
    setTrip({ ...trip, [name]: value })
    } else setTrip({ ...trip, [name]: checked })
  }

  const saveTrip = () => {
    const { name, startDate, endDate, confirmed } = trip
    TripService.create({ name, startDate, endDate, confirmed })
    setSubmitted(true)
  }
    

  const newTrip = () => {
    setTrip(initialTripState)
    setSubmitted(false)
  }

  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add new trip</h1>
        <Form >
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={trip.name} 
            required 
            onChange={handleInputChange}
          />
          <Input 
            type="date" 
            id="startDate" 
            name="startDate" 
            value={trip.startDate} 
            required 
            onChange={handleInputChange}
          />
          <Input 
            type="date" 
            id="endDate" 
            name="endDate"
            value={trip.endDate} 
            required 
            onChange={handleInputChange}
          />
          <Toggle 
            id="confirmed" 
            name="confirmed" 
            value={trip.confirmed} 
            onChange={handleInputChange}
          />
          <Button
            onClick={saveTrip} 
            text="Submit"
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New trip submitted successfully!</h4>
        <NewTripDiv>
          <Button onClick={newTrip} text="Add more" style={{marginRight: '20px'}}/>
          <Link to={`/trips`}>
            <Button text="All trips"/>
          </Link>
        </NewTripDiv>
      </div>
  }
  </Template>
  )
}

const NewTripDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: center;
`

export default AddTrip