import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createSlot } from "../actions/slots"
import { Toggle, Input, Template, Form, Button, Dropdown } from "../components"

const AddSlot = (props) => {

  const initialSlotState = {
    id: null,
    timeframe: "",
    stayType: "",
    notes: "",
    carerId: null,
    dayId: props.match.params.id
  }
  const [slot, setSlot] = useState(initialSlotState)

  const [submitted, setSubmitted] = useState()

  const dispatch = useDispatch()

  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setSlot({ ...slot, [name]: value })
  }

  const saveSlot = () => {
    const { dayId, timeframe, stayType, notes, carerId } = slot
    const data = {
      timeframe: timeframe,
      stayType: stayType,
      notes: notes,
      carerId: carerId ? carerId : null,
    }

    dispatch(createSlot(dayId, data))
    .then(data => {
      console.log("DATA!", data)
      setSlot({
        id: data.id,
        timeframe: data.timeframe,
        stayType: data.stayType,
        notes: data.notes,
        carerId: data.carerId ? data.carerId : null,
        dayId: data.dayId
      })
    })
    .catch(e => {
      console.log(e)
    })
    setSubmitted(true)
  }

  const newSlot = () => {
    setSlot(initialSlotState)
    setSubmitted(false)
  }
console.log('SLOT', slot)

  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add new slot</h1>
        <Form onClick={saveSlot}>
          <Input 
            type="text" 
            id="timeframe" 
            name="timeframe" 
            value={slot.timeframe} 
            required 
            onChange={handleInputChange}
          />
          <Input 
            type="text" 
            id="stayType" 
            name="stayType" 
            value={slot.stayType} 
            required 
            onChange={handleInputChange}
          />
          <Input 
            type="text" 
            id="notes" 
            name="notes" 
            value={slot.notes}  
            onChange={handleInputChange}
          />
          
        </Form>
      </div>
    : 
      <div>
        <h4>New slot submitted successfully</h4>
        <Button onClick={newSlot} text="Add more" />
      </div>
  }
  </Template>
  )
}

export default AddSlot