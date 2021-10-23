import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { updateSlot, deleteSlot } from "../actions/slots"
import { retrieveCarers } from "../actions/carers"
import SlotDataService from "../services/SlotService"
import { Toggle, Input, Template, Form, Dropdown, Spacer, Button as StyledButton } from "../components"
import { fromCarerNameToId } from "../lib/functionsAndObjects"


const EditSlot = (props) => {
  const initialSlotState = {
    id: null,
    timeframe: "",
    stayType: "",
    notes: "",
    carer: "",
  }

  const [currentSlot, setCurrentSlot] = useState(initialSlotState)
  const [message, setMessage] = useState("")

  const carers = useSelector(state => state.carers)


  const dispatch = useDispatch()

  const getSlot = id => {
    SlotDataService.get(id)
    .then(res => {
      setCurrentSlot(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getSlot(props.match.params.id)
  }, [props.match.params.id])

  useEffect(()=> {
    dispatch(retrieveCarers())
  }, [dispatch])

  const handleInputChange = event => {
    const { name, value } = event.target
      setCurrentSlot({ ...currentSlot, [name]: value })
  }
console.log("currentSlot", currentSlot)
  const updateContent = () => {
    const updatedCarer = fromCarerNameToId(currentSlot.carer, carers)
    currentSlot.carerId = updatedCarer.id
    dispatch(updateSlot(currentSlot.id, currentSlot))
    .then(res => {
      console.log(res)
      setMessage("slot updated successfully")
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeSlot = () => {
    dispatch(deleteSlot(currentSlot.id))
    .then(()=> {
      props.history.push("/slots")
    })
    .catch(e => {
      console.log(e)
    })
  }

  
  return (
    <Template>
      {currentSlot ? (
        <div>
          <h2>UPDATE Slot</h2>
          <Form>
              <Input
                type="text"
                id="timeframe"
                name="timeframe"
                value={currentSlot.timeframe}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                id="stayType"
                name="stayType"
                value={currentSlot.stayType}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                id="notes"
                name="notes"
                value={currentSlot.notes}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                id="carer"
                name="carer"
                value={currentSlot.carer?.name}
                onChange={handleInputChange}
              />
              
          </Form>
          {/* {currentSlot.confirmed && (
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
          <Button text="Delete" onClick={removeSlot}/>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Select a slot</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 0px 10px 10px 0px;
`

export default EditSlot