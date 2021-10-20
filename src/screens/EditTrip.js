import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { updateTrip, deleteTrip } from "../actions/trips"
import TripDataService from "../services/TripService"
import { Toggle, Input, Template, Form, Dropdown, Spacer, Button as StyledButton } from "../components"


const EditTrip = (props) => {
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


  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
      setCurrentTrip({ ...currentTrip, [name]: value })
    } else setCurrentTrip({ ...currentTrip, [name]: checked })
  }

  const updateStatus = status => {
    const data = {
      id: currentTrip.id,
      name: currentTrip.name,
      confirmed: status
    }

    dispatch(updateTrip(currentTrip.id, data))
    .then(res => {
      console.log(res)

      setCurrentTrip({ ...currentTrip, confirmed: status })
      setMessage("status updated successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const updateContent = () => {
    dispatch(updateTrip(currentTrip.id, currentTrip))
    .then(res => {
      console.log(res)
      setMessage("trip updated successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

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
      {currentTrip ? (
        <div>
          <h2>UPDATE Trip</h2>
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
          {/* {currentTrip.confirmed && (
            <Button text="Un-confirm" onClick={() => updateStatus(false)}/>
          )  */}
          {/* // (
          //   <Button text="Confirm" onClick={() => updateStatus(true)}/>
          // ) */}
          {/* } */}
          <Button
            type="submit"
            text="Update"
            onClick={updateContent}
          />
          <Button text="Delete" onClick={removeTrip}/>
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