import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSlot } from "../actions/slots"
import { retrieveCarers } from "../actions/carers"
import { Toggle, Input, Template, Form, Button, Dropdown } from "../components"
import { fromCarerNameToId } from "../lib/functionsAndObjects"

const AddSlot = (props) => {

  const initialSlotState = {
    id: null,
    timeframe: "",
    stayType: "",
    notes: "",
    carer: "",
    dayId: props.match.params.id
  }
  const [slot, setSlot] = useState(initialSlotState)

  const [submitted, setSubmitted] = useState()

  const carers = useSelector(state => state.carers)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(retrieveCarers())
  }, [dispatch])


  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setSlot({ ...slot, [name]: value })
  }

  const saveSlot = () => {
    const { dayId, timeframe, stayType, notes, carer } = slot
    console.log("carer", carer)

    const carerObj = fromCarerNameToId(carer, carers)
    console.log("carerObj", carerObj)
    const carerId = carerObj?.id

    const data = {
      timeframe: timeframe,
      stayType: stayType,
      notes: notes,
      carerId: carer ? carerId : null,
    }

    dispatch(createSlot(dayId, data))
    .then(data => {
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
  console.log("slot", slot)
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
          {/* <Input 
            type="text" 
            id="carer" 
            name="carer" 
            value={slot.carerId}  
            onChange={handleInputChange}
          />  */}
          <Dropdown
            data={carers}
            name="carer"
            id="carer"
            onChange={handleInputChange}
            value={slot.carer.name}
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