import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TripService from "../services/TripService"
import { Toggle, Input, Template, Form, Button as StyledButton } from "../components"


const EditTrip = (props) => {
  const initialTripState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentTrip, setCurrentTrip] = useState(initialTripState)
  const [message, setMessage] = useState("")

  const getTrip = id => {
    TripService.get(id)
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


  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
      setCurrentTrip({ ...currentTrip, [name]: value })
    } else setCurrentTrip({ ...currentTrip, [name]: checked })
  }


  const updateContent = () => {
    TripService.update(currentTrip.id, currentTrip)
    .then(res => {
      console.log(res)
      setMessage("Trip updated successfully! Wait to be redirected")
      setTimeout(() => props.history.goBack(), 1500)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeTrip = () => {
    TripService.remove(currentTrip.id)
    .then(()=> {
      props.history.push("/trips")
    })
    .catch(e => {
      console.log(e)
    })
  }
  
  return (
    <Template>
      {currentTrip ? (
        <div>
          <h1>UPDATE Trip</h1>
          <Form>
            <Input
              type="text"
              id="name"
              name="name"
              value={currentTrip.name}
              onChange={handleInputChange}
            />
            <Toggle 
              id="confirmed" 
              name="confirmed" 
              value={currentTrip.confirmed} 
              onChange={handleInputChange}
            />
          </Form>
          <Button
            type="submit"
            text="Update"
            onClick={updateContent}
          />
          <Button text="Delete" onClick={removeTrip} outlined/>
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
  margin: 0px 10px 10px 0px;
`

export default EditTrip