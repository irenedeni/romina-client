import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTrip } from "../actions/trips"
import Form from "../components/Form"
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import Template from "../components/Template"

const AddTrip = () => {

  const initialTripState = {
    id: null,
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    confirmed: false
  }
  const [trip, setTrip] = useState(initialTripState)

  const [submitted, setSubmitted] = useState()

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
    setTrip({ ...trip, [name]: value })
    } else setTrip({ ...trip, [name]: checked })
  }

  const saveTrip = () => {
    const { name, startDate, endDate, confirmed } = trip
    dispatch(createTrip(name, startDate, endDate, confirmed))
    .then(data => {
      setTrip({
        id: data.id,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        confirmed: data.confirmed ? data.confirmed : false
      })
    })
    .catch(e => {
      console.log(e)
    })
    setSubmitted(true)
  }

  const newTrip = () => {
    setTrip(initialTripState)
    setSubmitted(false)
  }
console.log('trip', trip)

  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add new trip</h1>
        <Form onClick={saveTrip}>
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
          <Checkbox 
            id="confirmed" 
            name="confirmed" 
            value={trip.confirmed} 
            onChange={handleInputChange}
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New trip submitted successfully</h4>
        <button onClick={newTrip}>Add more</button>
      </div>
  }
  </Template>
  )
}

export default AddTrip